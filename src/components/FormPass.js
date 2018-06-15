import React, { Component } from "react";
import { FormControl } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { HelpBlock } from 'react-bootstrap'

class FormPass extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    getValidationState() {
        let password = this.state.value;
        if (password == '') return null;
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if(strongRegex.test(password)) {
            return 'success';
        } else if(mediumRegex.test(password)) {
            return 'success';
        } else if(password != "") {
            return 'warning';
        } else {
            return 'error'
        }
        return null;
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Enter a password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.value}
                        placeholder="Super secret password"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Enter a strong password</HelpBlock>
                </FormGroup>
            </form>
        );
    }
}

export default FormPass;