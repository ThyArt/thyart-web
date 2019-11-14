import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingLayout from 'layout/LandingLayout';
import { Configure } from 'http/Client';
import DashBoardLayout from 'layout/DashBoardLayout';
import Cookies from 'universal-cookie';

Configure();

const accessToken = new Cookies().get('accessToken');

class App extends Component {
  render() {
    console.log(accessToken);
    return (
      <Router>
        <Switch>
          <Route
            path="/dashboard"
            render={props =>
              accessToken !== undefined ? <DashBoardLayout {...props} /> : <Redirect to={'/'} />
            }
          />
          <Route
            path="/"
            render={props =>
              accessToken === undefined ? (
                <LandingLayout {...props} />
              ) : (
                <Redirect to={'/dashboard'} />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
