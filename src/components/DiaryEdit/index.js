import React from "react";
import { Form, Button } from "react-bootstrap/";

class FormBase extends React.Component {
  constructor(props) {
    super(props);
    const { title, body } = this.props;
    this.state = {
      title,
      body,
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel(event) {
    const { refresh } = this.props;
    refresh();
    event.preventDefault();
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  }
  onEditSubmit(event) {
    const { title, body } = this.state;
    const { backend, id, userId, refresh } = this.props;
    console.log("The title is ", title);
    console.log("THe body is ", body);
    const author = userId;
    backend
      .update(id, { title, body, author })
      .then(mess => {
        console.log(mess);
        refresh();
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });

    event.preventDefault();
  }
  render() {
    const { title, body, error } = this.state;
    const isInvalid = title === "" || body === "";
    return (
      <div>
        <Form onSubmit={this.onEditSubmit}>
          <h3>Edit Diary Entry </h3>
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
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={this.onClear}
            onClick={this.onCancel}
          >
            Cancel
          </Button>
        </Form>
        <div>{error}</div>
      </div>
    );
  }
}

export default FormBase;
