import React, { Component } from "react";
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

class FormEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  getValidationState = () => {
    let email = this.state.value;
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '')
      return null;
    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
        <form>
          <FormGroup controlId="formValidationNull" validationState={this.getValidationState()}>
            <ControlLabel>Enter your email</ControlLabel>
            <FormControl type="email" value={this.state.value} placeholder="dupont@email.com"
                         onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation relies on email syntax</HelpBlock>
          </FormGroup>
        </form>
    );
  }
}

export default FormEmail;