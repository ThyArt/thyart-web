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
                <Container className="pull-left">
                    <Row >
                        <Col xsHidden smHidden md={6} >
                            <Carousel id={"carouselSn"}>
                                <Carousel.Item >
                                    <img src={require('../static/artist.jpg')} id="quote" alt='artist'/>
                                    <Carousel.Caption>
                                        <h3>ThyArt is a very simple but powerful tool.</h3>
                                        <p>John Smith, galerist</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col xs={8} md={5} className="pull-right" id={"signinForm"}>
                            <h2>Sign In</h2>
                            <SignInForm/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SignIn;
