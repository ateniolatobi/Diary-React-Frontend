import React from "react";
import { Jumbotron, Container } from "react-bootstrap/";

class Landing extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Diary app</h1>
          <p className="lead">
            Diary app is an immersive web application where you can create,
            update, list and delete diary entries in order to help you structure
            your life.
          </p>
        </Container>
      </Jumbotron>
    );
  }
}

export default Landing;
