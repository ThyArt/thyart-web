import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import LandingPage from './containers/LandingPage.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Account from './containers/Account';
import NotFound from './containers/404';
import ClientDetails from './containers/ClientDetails';
import { Provider } from 'react-redux'
import configureStore from "./configureStore";

require('dotenv').config();
const store = configureStore();

ReactDOM.render(

    <Provider store={store}>
        <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/client" component={ClientDetails} />
              <Route component={NotFound} />
            </Switch>
          </Router>
    </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
