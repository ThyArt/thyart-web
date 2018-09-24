import React, { Component } from 'react';
import { Carousel as BaseCarousel } from 'react-bootstrap';

import '../css/Carousel.css';

class Carousel extends Component {
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
      <BaseCarousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
        id="carousel"
      >
        <BaseCarousel.Item>
          <img
            width="100%"
            src={require('../static/carousel.png')}
            alt="carousel"
          />
          <BaseCarousel.Caption>
            <h3>Thy Art</h3>
            <p>
              The <b>easy</b> dashboard for <b>your</b> gallery
            </p>
            <br />
          </BaseCarousel.Caption>
        </BaseCarousel.Item>
      </BaseCarousel>
    );
  }
}

export default Carousel;
