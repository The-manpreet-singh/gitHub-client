import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

import Error from "../components/Error";
import GitHubUsers from "../components/GitHubUsers/GitHubUsers";
import Home from "../components/Home";
import Navigation from "../components/Navigation-menu/Navigation";
import Following from "../components/Following/Following";
import { Repos } from "../components/UserRepos/Repos";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/users" component={GitHubUsers} />
            <Route path="/following" component={Following} />
            <Route path="/repos/:id" component={Repos} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
