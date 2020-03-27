import React from "react";
import { withBackend } from "../Backend/";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button, Form } from "react-bootstrap/";

class SigninBase extends React.Component {
  render() {
    const { authStat, backend, history } = this.props;

    return (
      <div>
        {backend.isAuthenticated ? (
          <div></div>
        ) : (
          <div>
            <p className="lead text-primary">Signin</p>
            <SigninForm
              authStat={authStat}
              backend={backend}
              history={history}
            />
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { backend, history } = this.props;
    if (backend.isAuthenticated) {
      history.push(ROUTES.HOME);
    }
  }
}

// const Signin = ({ authStat }) => {
//   console.log("authstat is ", authStat);
//   return (
//     <div>
//       <p>Signin</p>
//       <SigninForm authStat={authStat} />
//     </div>
//   );
// };
const INITIAL_STATE = {
  username: "",
  password: "",
  error: null
};
class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = event => {
    const { username, password } = this.state;
    const { authStat, backend } = this.props;
    console.log("authstat is ", authStat);
    this.props.backend
      .login(username, password)
      .then(val => {
        console.log(this.props.backend);
        this.setState({ ...INITIAL_STATE });
        authStat(backend.isAuthenticated);
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log("The error is " + error);
        this.setState({ error: "Ensure login parameters are correct" });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { username, password, error } = this.state;
    const isInvalid = password === "" || username === "";
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={this.onChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" disabled={isInvalid} type="submit">
          Sign In
        </Button>
        {error && <p className="text-warning">{error}</p>}
      </Form>
    );
  }
}

// const SigninForm = withRouter(withBackend(SigninFormBase));
const Signin = withRouter(withBackend(SigninBase));
export default Signin;
