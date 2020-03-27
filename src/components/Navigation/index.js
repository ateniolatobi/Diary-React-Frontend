import React from "react";
import Logout from "../Logout";
import { Link } from "react-router-dom";
import { withBackend } from "../Backend/";
import { Navbar, Nav } from "react-bootstrap/";

//   <Navbar bg="light" expand="lg">
//   <Navbar.Brand href="#home"><Link to="/">Diary App</Link></Navbar.Brand>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="#home"><Link to="/home">Home</Link></Nav.Link>
//       <Nav.Link href="#link"><Logout authStat={authStat} /></Nav.Link>
//     </Nav>
//     <Form inline>
//       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//       <Button variant="outline-success">Search</Button>
//     </Form>
//   </Navbar.Collapse>
// </Navbar>

const Authnav = ({ authStat, user }) => (
  <Navbar bg="dark" expand="lg">
    <Navbar.Brand>
      <Link to="/" style={{ color: "white" }}>
        Diary App
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" style={{ fontSize: "12px" }}>
        <Navbar.Text className="text-muted mr-3">
          <p>Signed in as: {user}</p>
        </Navbar.Text>
        <Nav.Link>
          <Link to="/home" style={{ color: "white" }}>
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/create" style={{ color: "white" }}>
            Create Diary
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Logout authStat={authStat} />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Unauthnav = () => (
  <Navbar bg="dark" expand="lg">
    <Navbar.Brand>
      <Link to="/" style={{ color: "white" }}>
        Diary App
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" style={{ fontSize: "12px" }}>
        <Nav.Link>
          <Link to="/signin" style={{ color: "white" }}>
            Signin
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/signup" style={{ color: "white" }}>
            Signup
          </Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

// const NavigationBase = ({ backend, authStat }) => {

// };

class NavigationBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  render() {
    const { backend, authStat } = this.props;
    console.log("backend is ", backend);
    const isAuth = backend.isAuthenticated;

    const { user } = this.state;

    // console.log(
    //   "user is ",
    //   localStorage.getItem("user_username"),
    //   "and token is ",
    //   localStorage.getItem("refresh_token")
    // );

    return (
      <div>
        {isAuth ? <Authnav authStat={authStat} user={user} /> : <Unauthnav />}
      </div>
    );
  }

  componentDidMount() {
    const { backend } = this.props;
    backend.getUser().then(
      user => {
        console.log("gotttt user ", user);
        this.setState({ user });
      },
      err => {}
    );
  }
}

const Navigation = withBackend(NavigationBase);
export default Navigation;
