import React from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button } from "react-bootstrap/";

class DeleteBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };

    this.toCancel = this.toCancel.bind(this);
    this.toDelete = this.toDelete.bind(this);
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <p className="lead">Are you sure you want to delete?</p>
        <Button onClick={this.toDelete} className="btn btn-info">
          Yes
        </Button>
        <Button onClick={this.toCancel} className="btn btn-danger ml-3">
          No
        </Button>

        <div className="text-danger">{error}</div>
      </div>
    );
  }

  toCancel(event) {
    const { refresh } = this.props;
    refresh();
    event.preventDefault();
  }

  toDelete(event) {
    const { backend, id } = this.props;
    backend
      .delete(id)
      .then(response => {
        console.log("deleted successfully");
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error: "Could not delete, An error occured" });
      });
    event.preventDefault();
  }
}

const Delete = withRouter(DeleteBase);

export default Delete;
