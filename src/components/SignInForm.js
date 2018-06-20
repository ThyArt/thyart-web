import React, { Component } from "react";
import { FormControl } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { HelpBlock } from 'react-bootstrap'

class SignInForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);

        this.state = {
            mailValue: '',
            passValue: ''
        };
    }

    getMailValidationState() {
        let email = this.state.mailValue;
        if (email == '') return null;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) ) {
            return 'success';
        }
        else {
            return 'error';
        }
    }

    getPassValidationState() {
        let password = this.state.passValue;
        if (password == '') return null;
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if(strongRegex.test(password) || mediumRegex.test(password))
        {
            return 'success';
        }  else if(password != "") {
            return 'warning';
        } else {
            return 'error'
        }
    }

    handleMailChange(e) {
        this.setState({ mailValue: e.target.value });
    }

    handlePassChange(e) {
        this.setState({ passValue: e.target.value });
    }

    render() {
        return (
            <form>
                <FormGroup
                    controlId="formValidationNull"
                    validationState={this.getMailValidationState()}
                >
                    <ControlLabel>Enter your email</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.mailValue}
                        onChange={this.handleMailChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getPassValidationState()}
                >
                    <ControlLabel>Enter your password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.passValue}
                        onChange={this.handlePassChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </form>
        );
    }
}

export default SignInForm;
