import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./components/SearchPage";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={SearchPage} />
      </Switch>
    );
  }
}

export default Routes;
