import React, { Component } from "react";
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import FormEmail from "./Form";
import FormPass from "./FormPass";

import './SignIn.css'

class SignIn extends Component {
    render() {
        return (
            <div id="signin">
                <FormEmail/>
                <FormPass label={"Enter a password"}/>
                <Button onClick={this.handleClose}>Sign In</Button>
            </div>
        );
    }
}

export default SignIn;