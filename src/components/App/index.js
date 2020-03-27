import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navigation from "../Navigation";
import Landing from "../Landing";
import Home from "../Home";
import Signin from "../Signin";
import Signup from "../Signup";
import NotFound from "../NotFound/";
import Create from "../DiaryCreate";
import View from "../DiaryView";
import { PrivateRoute } from "../../constants/utility";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authStatus: false
    };
    this.triggerAuthStat = this.triggerAuthStat.bind(this);
  }

  triggerAuthStat = status => {
    this.setState({
      authStatus: status
    });
  };

  render() {
    console.log("the function should be ", this.triggerAuthStat);
    return (
      <Router>
        <Navigation authStat={this.triggerAuthStat} />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute path="/home" component={Home} />
            <Route
              path="/signin"
              render={props => (
                <Signin {...props} authStat={this.triggerAuthStat} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} authStat={this.triggerAuthStat} />
              )}
            />
            <PrivateRoute path="/view/:id" component={View} />
            <PrivateRoute path="/create" component={Create} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
