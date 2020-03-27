import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("access_token") != null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);
export const convert_date = date => {
  let d = Date.parse(date);
  d = new Date(d);
  date = d.getDate() + " / " + d.getMonth() + " / " + d.getFullYear();
  return date;
};
