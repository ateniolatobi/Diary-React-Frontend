import React from "react";
import { withBackend } from "../Backend/";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Delete from "../DiaryDelete/";
import FormBase from "../DiaryEdit/";
import { convert_date } from "../../constants/utility";
import { Card, Button } from "react-bootstrap/";

class ViewBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null,
      error: true,
      renderItem: null,
      user: null
    };
    this.renderDelete = this.renderDelete.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.requestNetworkConnection = this.requestNetworkConnection.bind(this);
  }
  render() {
    const { error, renderItem } = this.state;

    console.log("render item is ", renderItem);
    return <div>{error ? <div></div> : <div>{renderItem} </div>}</div>;
  }

  renderDelete(event) {
    const { backend } = this.props;
    const { entry } = this.state;
    const { id } = entry;
    const renderItem = (
      <Delete
        backend={backend}
        id={id}
        refresh={this.requestNetworkConnection}
      />
    );
    this.setState({ renderItem });
    event.preventDefault();
  }

  renderEdit(event) {
    console.log("trigger edit");
    const { entry, user } = this.state;
    const { title, body, id } = entry;
    const { backend } = this.props;
    const renderItem = (
      <FormBase
        title={title}
        body={body}
        backend={backend}
        id={id}
        userId={user}
        refresh={this.requestNetworkConnection}
      />
    );
    this.setState({ renderItem });
    event.preventDefault();
  }
  requestNetworkConnection() {
    const { backend, match } = this.props;
    console.log("it is ", match.params.id);
    backend.view(match.params.id).then(
      entry => {
        console.log(entry);
        console.log("entry title is ", entry.title);
        const renderItem = (
          <Card>
            <Card.Body>
              <Card.Title className="font-weight-bold">
                {entry.title}
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "10px" }}
              >
                Created on {convert_date(entry.created_at)} | Updated on{" "}
                {convert_date(entry.created_at)}
              </Card.Subtitle>
              <Card.Text className="font-italic">{entry.body}</Card.Text>
              <Button onClick={this.renderEdit} className="btn btn-info">
                Edit
              </Button>
              <Button
                onClick={this.renderDelete}
                className="btn btn-danger ml-3"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
          // <div>
          //   <h1>Diary Entry </h1>
          //   <h3>
          //     <span>Title :</span>
          //     {entry.title}
          //   </h3>
          //   <p>
          //     <span>Body :</span>
          //     {entry.body}
          //   </p>
          //   <div>
          //     Date created : <span>{convert_date(entry.created_at)}</span>
          //   </div>
          //   <div>
          //     Date updated : <span>{convert_date(entry.updated_at)}</span>
          //   </div>
          //   <button onClick={this.renderEdit}>Edit</button>
          //   <button onClick={this.renderDelete}>Delete</button>
          // </div>
        );

        this.setState({
          entry,
          error: this.state.error === true ? false : false,
          renderItem,
          user: entry.author
        });
      },
      err => {
        this.props.history.push(ROUTES.HOME);
      }
    );
  }
  componentDidMount() {
    this.requestNetworkConnection();
  }
}
const View = withRouter(withBackend(ViewBase));
export default View;
