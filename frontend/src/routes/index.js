import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import AuthRoute from "./AuthRoute";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/" component={Home}></AuthRoute>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
