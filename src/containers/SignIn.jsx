import React, { Component } from 'react';
import { Button, Carousel, Grid, Col, Row, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/SignIn.css';
import SignInForm from '../components/SignInForm';

class SignIn extends Component {
  render() {
    return (
      <div>
        <Grid className="pull-left">
          <Row>
            <Thumbnail
              href=".."
              src={require('../static/VerySmallLogo.png')}
              alt="logo"
              id="logo"
            />
            <Col xsHidden smHidden md={6}>
              <Carousel>
                <Carousel.Item>
                  <img
                    src={require('../static/artist.jpg')}
                    id="quote"
                    alt="artist"
                  />
                  <Carousel.Caption>
                    <h3>ThyArt is a very simple but powerful tool.</h3>
                    <p>John Smith, galerist</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col xs={8} md={5} className="pull-right">
              <footer id="footer">
                <Button className="pull-right">
                  <Link to="../signup">Sign Up</Link>
                </Button>
              </footer>
              <h2>Sign In</h2>
              <SignInForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SignIn;
