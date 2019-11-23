import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingLayout from 'layout/LandingLayout';
import { Configure } from 'http/Client';
import DashBoardLayout from 'layout/DashBoardLayout';
import Cookies from 'universal-cookie';

const App = function App() {
  Configure();

  return (
    <Router>
      <Switch>
        <Route
          path="/dashboard"
          render={props =>
            new Cookies().get('accessToken') ? (
              <DashBoardLayout {...props} />
            ) : (
              <Redirect to={'/'} />
            )
          }
        />
        <Route
          path="/"
          render={props =>
            !new Cookies().get('accessToken') ? (
              <LandingLayout {...props} />
            ) : (
              <Redirect to={'/dashboard'} />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
