import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import '../css/Services.css';

class Services extends Component {
  render() {
    return (
      <div id="services">
        <Jumbotron id="macbook">
          <img
            src={require('../static/macbook.png')}
            alt="MacBook"
            id="deviceThree"
          />
          <p className="servicesLeft">Visualiser facilement les données critiques
              <br/>de votre galerie à travers une interface intuitive.
              <br/>L'interface web permet une compatibilité avec système
              <br/>windows, Mac et linux.
          </p>
        </Jumbotron>
        <Jumbotron id="iphone">
          <img
            src={require('../static/iPhone-X-Mockup.png')}
            alt="Iphone"
            id="deviceTwo"
          />
          <p className="servicesRight">La version mobile du site vous permet de consulter
          <br/>les informations de votre galerie tout en étant en déplacement
          <br/></p>
        </Jumbotron>
        <Jumbotron id="ipad">
          <img
            src={require('../static/Device_iPad.png')}
            alt="Ipad"
            id="deviceOne"
          />
          <p className="servicesLeft">Lorem Ipsum Dolores</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Services;
