import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './LandingPage.js'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from './Account';
import NotFound from "./NotFound";

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/account" component={Account}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
