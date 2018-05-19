import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

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
                    <img width="100%"  src="/carousel.png" />
                    <Carousel.Caption>
                        <h3>Thy Art</h3>
                        <p>The easy dasboard for your gallery</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default ThyArtCarousel;
