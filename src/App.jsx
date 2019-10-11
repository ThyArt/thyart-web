import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LandingLayout from 'layout/LandingLayout';
import { Configure } from 'http/Client';

Configure();

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" component={LandingLayout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
