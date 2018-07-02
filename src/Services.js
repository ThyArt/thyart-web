import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import './css/Services.css'

class Services extends Component {
  render()
  {
    return (
        <div id="services">
          <Jumbotron id="macbook">
            <img src={require('./static/Device_MacBook.png')} alt="MacBook" id="deviceThree"/>
            <p className="servicesLeft">Lorem Ipsum Dolores</p>
          </Jumbotron>
          <Jumbotron id="iphone">
            <img src={require('./static/Device_Iphone.png')} alt="Iphone" id="deviceTwo"/>
            <p className="servicesRight">Lorem Ipsum Dolores</p>
          </Jumbotron>
          <Jumbotron id="ipad">
            <img src={require('./static/Device_iPad.png')} alt="Ipad" id="deviceOne"/>
            <p className="servicesLeft">Lorem Ipsum Dolores</p>
          </Jumbotron>
        </div>
    );
  }
}

export default Services;