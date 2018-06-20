import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import FormEmail from "./FormEmail";
import FormPass from "./FormPass";

import './SignIn.css'

class SignIn extends Component {
  render() {
    return (
        <div id="signin">
          <FormEmail/>
          <FormPass label={'Enter a password'}/>
          <Button onClick={this.handleClose}>Sign In</Button>
        </div>
    );
  }
}

export default SignIn;