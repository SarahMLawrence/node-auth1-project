import React, { Component } from "react";
import { Router, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  return (
    <Router
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          console.log("redirecting!");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
export default PrivateRoute;
