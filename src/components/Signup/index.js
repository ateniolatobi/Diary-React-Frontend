import React from "react";
import { withBackend } from "../Backend/";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button, Form } from "react-bootstrap/";

class SignupBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCreated: false
    };

    this.setCreated = this.setCreated.bind(this);
  }

  setCreated(hasCreated) {
    this.setState({ hasCreated });
  }

  render() {
    const { hasCreated } = this.state;
    const { backend } = this.props;
    let toRender = null;
    if (hasCreated) {
      toRender = (
        <div className="text-success">
          Your account has been created successfully.
          <br />
          <Link to="/signin" className="text-info">
            <p>Click to redirect to Signin page</p>
          </Link>
        </div>
      );
    } else {
      toRender = (
        <div>
          <p className="lead mt-5 text-info">Create an Account</p>
          <SignupForm setCreated={this.setCreated} backend={backend} />
        </div>
      );
    }
    return (
      <div>{backend.isAuthenticated ? <div></div> : <div>{toRender}</div>}</div>
    );
  }

  componentDidMount() {
    const { backend, history } = this.props;
    if (backend.isAuthenticated) {
      history.push(ROUTES.HOME);
    }
  }
}
const INITIAL_STATE = {
  username: "",
  password: "",
  password2: "",
  email: "",
  error: null
};
class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = event => {
    const { username, password, email } = this.state;
    const { setCreated, backend } = this.props;
    backend
      .signup({ username, email, password })
      .then(val => {
        console.log("created successfully");
        this.setState({ error: null });
        setCreated(val);
      })
      .catch(error => {
        this.setState({
          error: "An error occured. Reload the page or change the username"
        });
        console.log("error occurred");
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { username, password, password2, email, error } = this.state;
    const isInvalid =
      password === "" ||
      username === "" ||
      password2 === "" ||
      email === "" ||
      password !== password2;

    console.log("error is ", error);
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Email address"
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password2"
            value={password2}
            onChange={this.onChange}
            type="password"
            placeholder="Re-enter Password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" disabled={isInvalid} type="submit">
          Sign up
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
    );
  }
}

const Signup = withBackend(SignupBase);
export default Signup;
