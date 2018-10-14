import React, { Component } from 'react';
import { Container, Col, Row } from 'react-grid-system';

import '../css/About.css';

class About extends Component {
  render() {
    return (
      <div id="about">
        <Container fluid id="aboutContainer">
          <Row>
            <Col className="aboutCol">
              <img
                src={require('../static/missing.png')}
                alt="manage"
                height="120"
                width="auto"
                className="aboutLogo"
              />
              <br />
              <strong className="aboutText">Manage</strong>
              <br />
              <p className="aboutDesc">
                Manage your activity, from the reception of an artwork to the
                facturation.
              </p>
            </Col>
            <Col className="aboutCol">
              <img
                src={require('../static/missing.png')}
                alt="manage"
                height="120"
                width="auto"
                className="aboutLogo"
              />
              <br />
              <strong className="aboutText">Track</strong>
              <br />
              <p className="aboutDesc">
                Track artworks with a QR code and our app to know exactly the
                status of your collection.
              </p>
            </Col>
            <Col className="aboutCol">
              <img
                src={require('../static/missing.png')}
                alt="manage"
                height="120"
                width="auto"
                className="aboutLogo"
              />
              <br />
              <strong className="aboutText">Communicate</strong>
              <br />
              <p className="aboutDesc">
                Keep in touch with your artists and customer in one easy
                platform.
              </p>
            </Col>
          </Row>
        </Container>
        <div className="quotation">
          <em className="quote">
            "Mes notes ne suffisent pas pour retrouver quelles oeuvres a acheté
            un client."
          </em>
          <br />
          <p className="author">Philipe Eschenlohr, Galerie Raugraff</p>
        </div>
      </div>
    );
  }
}

export default About;
