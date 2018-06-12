import React, { Component } from "react";
import { Button } from 'react-bootstrap'

import "./Contact.css"

class Contact extends Component {
  render() {
    return (
        <div id="contact">
          <p>Ready to give your workflow a boost?</p>
          <Button
              bsStyle="primary"
              bsSize="large"
              href="mailto:contact@thyart.net"
          >
            Sign up
          </Button>
        </div>
    );
  }
}

export default Contact;
