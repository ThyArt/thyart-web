import React, { Component } from "react";
import { HashRouter  as Router, Route, Switch } from 'react-router-dom';
import LandingLayout from "layout/LandingLayout";
import SignInSide from "views/SignIn";
import SignUp from "views/SignUp";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LandingLayout} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
