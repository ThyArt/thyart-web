import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './LandingPage.js'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from './Account';

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/account" component={Account}/>
      </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
