import React, { Component } from 'react';
import { Carousel, Grid, Col, Row } from 'react-bootstrap';

import '../css/SignIn.css';
import SignInForm from '../components/SignInForm';
import Header from "../components/Header";

class SignIn extends Component {
    render() {
        return (
          <div >
              <Header/>
              <Grid className="pull-left">
                  <Row >
                      <Col xsHidden smHidden md={6} >
                          <Carousel id={"carouselSn"}>
                              <Carousel.Item >
                                  <img src={require('../static/artist.jpg')} id="quote" alt='artist'/>
                                  <Carousel.Caption>
                                      <h3>ThyArt est un outil simple mais utile.</h3>
                                      <p>John Smith, galeriste</p>
                                  </Carousel.Caption>
                              </Carousel.Item>
                          </Carousel>
                      </Col>
                      <Col xs={8} md={5} className="pull-right" id={"signinForm"}>
                          <h2>Se connecter</h2>
                          <SignInForm/>
                      </Col>
                  </Row>
              </Grid>
          </div>
        );
    }
}

export default SignIn;
