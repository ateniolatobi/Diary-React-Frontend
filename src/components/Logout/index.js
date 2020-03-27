import React from "react";
import { withBackend } from "../Backend/";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
class LogoutBase extends React.Component {
  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }
  render() {
    return (
      <a href="#" style={{ color: "white" }} onClick={this.doLogout}>
        Logout
      </a>
    );
  }

  doLogout(event) {
    const { backend, authStat } = this.props;
    backend.logout();
    this.props.history.push(ROUTES.Landing);
    authStat(backend.isAuthenticated);
    console.log("triggered");
    event.preventDefault();
  }

  componentDidMount() {}
}

const Logout = withRouter(withBackend(LogoutBase));
export default Logout;
