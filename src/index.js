import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import LandingPage from './containers/LandingPage.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Account from './containers/Account';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/account" component={Account} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
