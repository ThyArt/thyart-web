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
              <Container fluid>
                  <Row id={'row'}>
                      <Col lg={4} id={'carouselCol'}>
                          <Carousel id="carousel">
                              <Carousel.Item id={'carouselItem'}>
                                  <img id={'image'} src={require('../static/mess.png')}  alt='artist'/>
                                  <Carousel.Caption>
                                      <h3 id={'quote'}>ThyArt est un outil simple mais utile.</h3>
                                      <p>John Smith, galeriste</p>
                                  </Carousel.Caption>
                              </Carousel.Item>
                          </Carousel>
                      </Col>
                      <Col lg={{ span: 3, offset: 1 }} id="signupForm">
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
