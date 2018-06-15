import React, { Component } from "react";
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import FormEmail from "./Form";
import FormPass from "./FormPass";

import './SignIn.css'

class SignIn extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            email: '',
            password: '',
            show: false
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login() {

    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Sign In
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormEmail/>

                        <FormPass/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Sign In</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SignIn;