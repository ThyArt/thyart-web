import React, {Component} from "react";
import {Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap'
import {registerAPI} from "./requests";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      passwd: '',
      confirmPasswd: '',
      success: false,
      error: null
    }
  }

  signup = () => {
    if (this.getValidationEmail(this.state.mail) === 'success' &&
        this.getValidationPasswd(this.state.passwd) === 'success' &&
        this.state.passwd !== '' &&
        this.state.confirmPasswd === this.state.passwd)
    {
      const tmp = { name: 'toto', email: this.state.mail, password: this.state.passwd };
      registerAPI(tmp).then(res => {
        this.setState({ success: true, error: null });
        console.log('success: ' + res.data);
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.messages) {
          this.setState({ success: false, error: error.response.data.messages[0] });
          console.error('error: ' + error.response.data.messages[0]);
        } else {
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

  confirmPasswdChange = e => {
    this.setState({ confirmPasswd: e.target.value })
  };

  render() {
    return (
        <div id="singup">
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

            <FormGroup className="formBasicText" validationState={this.getValidationPasswd(this.state.confirmPasswd)}>
              <ControlLabel>
                Confirm password
              </ControlLabel>
              <FormControl
                  type="password"
                  value={this.state.confirmPasswd}
                  placeholder="Super secret password"
                  onChange={this.confirmPasswdChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Enter a strong password</HelpBlock>
            </FormGroup>

            <Button onClick={this.signup}>Sign Up</Button>

            {
              this.state.success
                  ? <Alert bsStyle="success">Your account is created. Thanks for your interest!</Alert>
                  : null
            }

            {
              this.state.error
                  ? <Alert bsStyle="danger">{`Error while creating your account: ${this.state.error}`}</Alert>
                  : null
            }
          </form>
        </div>
    );
  }
}

export default SignUp;