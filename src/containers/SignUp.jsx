import React, { Component } from 'react';
import { Button, Carousel, Grid, Row, Col} from 'react-bootstrap';
import SignUpForm from '../components/SignUpForm';
import '../css/SignUp.css';
import Header from "../components/Header";

class SignUp extends Component{
    render() {
        return (
            <div id="signup">
                <Header/>
                <Grid className="pull-left">
                    <Row >
                        <Col xsHidden smHidden md={6} >
                            <Carousel id={"carouselSn"}>
                                <Carousel.Item>
                                    <img src={require('../static/artist.jpg')} id="quote" alt='artist'/>
                                    <Carousel.Caption>
                                        <h3>ThyArt is a very simple but powerful tool.</h3>
                                        <p>John Smith, galerist</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col xs={8} md={5} className="pull-right"id={"signupForm"}>
                            <h2>Sign Up</h2>
                            <SignUpForm />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default SignUp;
