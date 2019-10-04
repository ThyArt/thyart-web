import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";

import "../assets/css/Contact.css";

class Contact extends Component {
  render() {
    return (
      <div id="contact">
        <p>Prêt à accélérer votre activité ?</p>
        <BrowserRouter>
          <Link to="/signup">
            <Button bsstyle="primary" bssizee="large">
              Inscrivez vous
            </Button>
          </Link>
        </BrowserRouter>
      </div>
    );
  }
}

export default Contact;
