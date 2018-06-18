import React, { Component } from "react";
import { Button } from 'react-bootstrap'
import FormEmail from "./Form";
import FormPass from "./FormPass";

class SignUp extends Component {
  render() {
    return (
        <div id="singup">
          <FormEmail/>
          <FormPass label="Enter Password"/>
          <FormPass label="Confirm password"/>
          <Button onClick={this.handleClose}>Sign Up</Button>
        </div>
    );
  }
}

export default SignUp;