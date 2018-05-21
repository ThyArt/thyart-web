import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ThyArtCarousel extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        const { index, direction } = this.state;

        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                <Carousel.Item>
                    <img width="100%"  src={require('./static/carousel.png')} alt="carousel"/>
                    <Carousel.Caption>
                        <h3>Thy Art</h3>
                        <p>The <b>easy</b> dashboard for <b>your</b> gallery</p>
                        <Button>SIGNUP FOR FREE</Button>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default ThyArtCarousel;
