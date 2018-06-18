import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./Contact.css"

class Contact extends Component {
  render() {
    return (
        <div id="contact">
          <p>Ready to give your workflow a boost?</p>
          <Link to="/signup">
            <Button bsStyle="primary" bsSize="large">
              Sign Up!
            </Button>
          </Link>
        </div>
    );
  }
}

export default Contact;
