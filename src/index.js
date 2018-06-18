import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './LandingPage.js'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from './Account';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/account" component={Account}/>
      </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
