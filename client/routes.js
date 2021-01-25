import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import SelectGenre from "./components/SelectGenre";
import DiveResults from "./components/DiveResults";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/dive" component={DiveResults} />
        <Route exact path="/selectGenre" component={SelectGenre} />
        <Route path="/" component={SearchPage} />
      </Switch>
    );
  }
}

export default Routes;
