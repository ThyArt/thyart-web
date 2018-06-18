import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

class FormPass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      label: ''
    };
  }

  getValidationState = () => {
    let password = this.state.value;
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (password === '')
      return null;
    if (strongRegex.test(password) || mediumRegex.test(password)) {
      return 'success';
    } else if (password !== "") {
      return 'warning';
    } else {
      return 'error'
    }
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
        <form>
          <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
            <ControlLabel>
              {this.props.label}
            </ControlLabel>
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