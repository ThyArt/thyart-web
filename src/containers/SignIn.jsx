import React, { Component } from 'react';
import { Carousel, Container, Col, Row } from 'react-bootstrap';

import '../css/SignIn.css';
import SignInForm from '../components/SignInForm';
import Header from "../components/Header";

class SignIn extends Component {
    render() {
        return (
          <div >
              <Header/>
              <Container fluid>
                  <Row id={'row'}>
                      <Col lg={4} id={'carouselCol'}>
                          <Carousel id={'carousel'}>
                              <Carousel.Item id={'carouselItem'}>
                                  <img id={'image'} src={require('../static/mess.png')} alt='artist'/>
                                  <Carousel.Caption>
                                      <h3 id="quote">ThyArt est un outil simple mais utile.</h3>
                                      <p>John Smith, galeriste</p>
                                  </Carousel.Caption>
                              </Carousel.Item>
                          </Carousel>
                      </Col>
                      <Col lg={{ span: 3, offset: 1 }} id={"signinForm"}>
                          <h2>Se connecter</h2>
                          <SignInForm/>
                      </Col>
                  </Row>
              </Container>
          </div>
        );
    }
}

export default SignIn;
