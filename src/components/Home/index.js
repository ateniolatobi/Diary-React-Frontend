import React from "react";
import { withBackend } from "../Backend/";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Card, Button } from "react-bootstrap/";
import  {convert_date} from '../../constants/utility'

class HomeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diaryLists: [],
      error: false
    };
  }
  render() {
    // const username = localStorage.getItem("user_username");
    const { diaryLists, error } = this.state;
    console.log(diaryLists);
    const renderList = diaryLists.map(item => (
      <Card className="text-center mb-4">
        <Card.Header>Diary Entry</Card.Header>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Button variant="primary">
            <Link to={`/view/${item.id}`} style={{ color: "white" }}>
              Click for more details
            </Link>
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <span>Created at {convert_date(item.created_at)} </span>
        </Card.Footer>
      </Card>
    ));
    let renderItem = null;
    if (renderList.length > 0) {
      renderItem = (
        <div>
          <p className="h4">List of Diary Entries</p>
          <ul>{renderList}</ul>
        </div>
      );
    } else {
      renderItem = <div></div>;
    }
    return (
      <div>
        {error ? (
          <div className="text-danger">An error occured</div>
        ) : (
          <div>{renderItem}</div>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { backend } = this.props;
    backend.list().then(
      diaryLists => {
        console.log(diaryLists);
        this.setState({ diaryLists });
      },
      err => {
        this.setState({ error: true });
        console.log(err);
      }
    );
  }
}
const Home = withBackend(HomeBase);
export default Home;
