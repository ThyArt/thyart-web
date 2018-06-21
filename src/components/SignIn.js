import React, { Component } from 'react';
import {Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap'
import {loginAPI} from "./requests";
import { Redirect } from 'react-router-dom';

import './SignIn.css'

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      passwd: '',
      error: null,
      logged: false
    }
  }

  signin = () => {
    if (this.getValidationEmail(this.state.mail) === 'success' &&
        this.getValidationPasswd(this.state.passwd) === 'success' &&
        this.state.passwd !== '')
    {
      const tmp = { user: this.state.mail, passwd: this.state.passwd };
      loginAPI(tmp).then(res => {
        this.setState({ error: null, logged: res.data['access_token'] });
        console.log('success: ' + res.data);
      }).catch(error => {
        this.setState({ logged: false });
        if (error.response && error.response.data && error.response.data.messages) {
          this.setState({ error: error.response.data.messages[0] });
          console.error('error: ' + error.response.data.messages[0]);
        } else {
          this.setState({ error: 'An unknown error occurred.' });
          console.error('Unknown error.');
        }
      });
    }
  };

  getValidationPasswd = passwd => {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (passwd === '')
      return null;
    if (passwd !== this.state.passwd) {
      return 'error';
    }
    if (strongRegex.test(passwd) || mediumRegex.test(passwd)) {
      return 'success';
    } else if (passwd !== "") {
      return 'warning';
    } else {
      return 'error';
    }
  };

  getValidationEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '')
      return null;
    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  };

  emailChange = e => {
    this.setState({ mail: e.target.value })
  };

  passwdChange = e => {
    this.setState({ passwd: e.target.value })
  };

  render() {
    return (
        <div id="signin">
          <form>
            <FormGroup className="formValidationNull" validationState={this.getValidationEmail(this.state.mail)}>
              <ControlLabel>Enter your email</ControlLabel>
              <FormControl type="email" value={this.state.mail} placeholder="dupont@email.com"
                           onChange={this.emailChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation relies on email syntax</HelpBlock>
            </FormGroup>

            <FormGroup className="formBasicText" validationState={this.getValidationPasswd(this.state.passwd)}>
              <ControlLabel>
                Enter Password
              </ControlLabel>
              <FormControl
                  type="password"
                  value={this.state.passwd}
                  placeholder="Super secret password"
                  onChange={this.passwdChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Enter a strong password</HelpBlock>
            </FormGroup>

            <Button onClick={this.signin}>Sign In</Button>

            {
              this.state.error
                  ? <Alert bsStyle="danger">{`Error while logging in: ${this.state.error}`}</Alert>
                  : null
            }

            {
              this.state.logged
                  ? <Redirect to={{
                    pathname: '/account',
                    state: {token: this.state.logged}
                  }}/>
                  : null
            }
          </form>
        </div>
    );
  }
}

export default SignIn;