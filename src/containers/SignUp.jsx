import React, { Component } from 'react';
import {Carousel, Container, Row, Col} from 'react-bootstrap';
import SignUpForm from '../components/SignUpForm';
import '../css/SignUp.css';
import Header from "../components/Header";

class SignUp extends Component{
    render() {
        return (
          <div id="signup">
              <Header/>
              <Container className="pull-left">
                  <Row >
                      <Col xsHidden smHidden md={6} >
                          <Carousel id="carouselSn">
                              <Carousel.Item>
                                  <img src={require('../static/artist.jpg')} id="quote" alt='artist'/>
                                  <Carousel.Caption>
                                      <h3>ThyArt est un outil simple mais utile.</h3>
                                      <p>John Smith, galeriste</p>
                                  </Carousel.Caption>
                              </Carousel.Item>
                          </Carousel>
                      </Col>
                      <Col xs={8} md={5} className="pull-right" id="signupForm">
                          <h2>Inscription</h2>
                          <SignUpForm />
                      </Col>
                  </Row>
              </Container>
          </div>
        );
    }
}

export default SignUp;
