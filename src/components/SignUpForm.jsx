import React, { Component } from 'react';
import {
  FormControl,
  Alert,
  Button,
  FormGroup,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import { signUpIfNeeded } from "../actions/actionsAuth";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

class SignUpForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);

        this.state = {
            nameValue: '',
            firstnameValue: '',
            lastnameValue: '',
            mailValue: '',
            passValue: '',
            confirmValue: ''
        };
    }

    signup = () => {
        if (
          this.getNameValidationState() === 'success' &&
          this.getFirstnameValidationState() === 'success' &&
          this.getLastnameValidationState() === 'success' &&
          this.getMailValidationState() === 'success' &&
            this.getPassValidationState() === 'success' &&
            this.getConfirmValidationState() === 'success'
        ) {
            this.props.dispatch(signUpIfNeeded(this.state.nameValue, this.state.firstnameValue, this.state.lastnameValue,
                                                this.state.mailValue, this.state.passValue));
        }
    };

  getNameValidationState() {
    let name = this.state.nameValue;
    if (name === '') return null;
    return 'success';
  }

  getFirstnameValidationState() {
    let firstname = this.state.firstnameValue;
    if (firstname === '') return null;
    return 'success';
  }

  getLastnameValidationState() {
    let lastname = this.state.lastnameValue;
    if (lastname === '') return null;
    return 'success';
  }

    getMailValidationState() {
        let email = this.state.mailValue;
        if (email === '') return null;
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getPassValidationState() {
        let password = this.state.passValue;
        if (password === '') return null;
        let strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        );
        let mediumRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
        );
        if (strongRegex.test(password) || mediumRegex.test(password)) {
            return 'success';
        } else if (password !== '') {
            return 'warning';
        } else {
            return 'error';
        }
    }

    getConfirmValidationState() {
        let password = this.state.confirmValue;
        if (password === '') return null;
        if (password === this.state.passValue) {
            return 'success';
        } else {
            return 'error';
        }
    }

    handleMailChange(e) {
        this.setState({mailValue: e.target.value});
    }

    handlePassChange(e) {
        this.setState({passValue: e.target.value});
    }

    handleConfirmChange(e) {
        this.setState({confirmValue: e.target.value});
    }

  handleNameChange(e) {
    this.setState({nameValue: e.target.value})
  }

    handleFirstnameChange(e) {
      this.setState({firstnameValue: e.target.value})
    }

    handleLastnameChange(e) {
      this.setState({lastnameValue: e.target.value})
    }

    render() {
        return (
            <form>
              <FormGroup
                controlId="formValidationNull"
                validationState={this.getNameValidationState()}
              >
                <ControlLabel>Enter an username</ControlLabel>
                <FormControl
                  type="username"
                  value={this.state.nameValue}
                  placeholder="Your username"
                  onChange={this.handleNameChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup
                controlId="formValidationNull"
                validationState={this.getFirstnameValidationState()}
              >
                <ControlLabel>Enter your first name</ControlLabel>
                <FormControl
                  type="username"
                  value={this.state.firstnameValue}
                  placeholder="Your first name"
                  onChange={this.handleFirstnameChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup
                controlId="formValidationNull"
                validationState={this.getLastnameValidationState()}
              >
                <ControlLabel>Enter your last name</ControlLabel>
                <FormControl
                  type="username"
                  value={this.state.lastnameValue}
                  placeholder="Your last name"
                  onChange={this.handleLastnameChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
                <FormGroup
                    controlId="formValidationNull"
                    validationState={this.getMailValidationState()}
                >
                    <ControlLabel>Enter your email</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.mailValue}
                        placeholder="dupont@email.com"
                        onChange={this.handleMailChange}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock>Validation relies on email syntax</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getPassValidationState()}
                >
                    <ControlLabel>Enter your password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.passValue}
                        placeholder="Super secret password"
                        onChange={this.handlePassChange}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock>Enter a strong password</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="formBasicText2"
                    validationState={this.getConfirmValidationState()}
                >
                    <ControlLabel>Confirm password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.confirmValue}
                        onChange={this.handleConfirmChange}
                    />
                    <FormControl.Feedback/>
                </FormGroup>

                {this.props.isFetching ? (
                    <ReactLoading type={'spin'} color={'black'} height={50} width={50} />
                ) :  (
                    <Button onClick={this.signup}>Sign Up</Button>
                )
                }

                {this.props.msg ? (
                    <Alert bsStyle="success">
                        {this.props.msg}
                    </Alert>
                ) : null}

                {this.props.error ? (
                    <Alert bsStyle="danger">{`Error while creating your account: ${
                        this.props.error
                        }`}</Alert>
                ) : null}
            </form>
        );
    }
}

SignUpForm.propTypes = {
    isLogged: PropTypes.bool,
    isFetching: PropTypes.bool,
    token: PropTypes.string,
    msg: PropTypes.string,
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isLogged,
        isFetching,
        token,
        msg,
        error
    } = state.authentication;

    return {
        isLogged,
        isFetching,
        token,
        msg,
        error
    }
}

export default connect(mapStateToProps)(SignUpForm);
