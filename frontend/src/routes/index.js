import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import EditTask from "../components/EditTask";
import User from "../components/User";
import Login from "../components/Login";
import AuthRoute from "./AuthRoute";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/" component={Home}></AuthRoute>
          <AuthRoute exact path="/edit/:id" component={EditTask}></AuthRoute>
          <AuthRoute exact path="/user" component={User}></AuthRoute>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
