import React from "react";
import { withBackend } from "../Backend/";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Form, Button } from "react-bootstrap/";

const INITIAL_STATE = {
  title: "",
  body: "",
  error: ""
};
class CreateBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onChange = this.onChange.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onClear(event) {
    this.setState({ ...INITIAL_STATE });
    event.preventDefault();
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  }
  onCreateSubmit(event) {
    const { title, body } = this.state;
    const { backend } = this.props;
    console.log("The title is ", title);
    console.log("THe body is ", body);
    backend
      .create({ title, body })
      .then(mess => {
        console.log(mess);
        this.props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: "An error occured try reloading the page or sign in again"
        });
      });

    event.preventDefault();
  }
  render() {
    const { title, body, error } = this.state;
    const isInvalid = title === "" || body === "";
    return (
      <div>
        <Form onSubmit={this.onCreateSubmit}>
          <h3>Create Diary Entry </h3>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={title}
              onChange={this.onChange}
              type="text"
              placeholder="Entry Title"
            />
          </Form.Group>

          <br />
          <Form.Group>
          <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              name="body"
              onChange={this.onChange}
              value={body}
            />
          </Form.Group>
          <br />
          <Button
            variant="success"
            className="mr-3"
            disabled={isInvalid}
            type="submit"
          >
            Create
          </Button>
          <Button variant="danger" onClick={this.onClear}>
            Clear
          </Button>
        </Form>
        <div>{error}</div>
      </div>
    );
  }
}

const Create = withRouter(withBackend(CreateBase));

export default Create;
