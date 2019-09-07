import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

import '../css/Services.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Services extends Component {
  render() {
    return (
      <div id="services">
        <Jumbotron id="macbook">
          <Container>
            <Row>
              <Col>
                <Image
                  fluid
                  src={require('../static/macbook.png')}
                  alt="MacBook"
                />
              </Col>
              <Col>
                <p className="services">
                  Visualiser facilement les données critiques de votre galerie à
                  travers une interface intuitive. L'interface web permet une
                  compatibilité avec système windows, Mac et linux.
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Jumbotron id="iphone">
          <Container>
            <Row>
              <Col>
                <p className="services">
                  La version mobile du site vous permet de consulter les
                  informations de votre galerie tout en étant en déplacement
                </p>
              </Col>
              <Col>
                <Image
                  id={'iphoneImg'}
                  src={require('../static/iPhone-X-Mockup.png')}
                  alt="Iphone"
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Services;
