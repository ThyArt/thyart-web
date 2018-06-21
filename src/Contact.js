import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Link } from 'react-router-dom';

import "./Contact.css"

class Contact extends Component {
  render() {
    return (
        <div id="contact">
          <p>Ready to give your workflow a boost?</p>
          <BrowserRouter>
            <Link to="/signup">
              <Button bsStyle="primary" bsSize="large">
                Sign Up!
              </Button>
            </Link>
          </BrowserRouter>
        </div>
    );
  }
}

export default Contact;
