import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import '../css/Carousel.css';

class CarouselComp extends Component {
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
        id="carousel"
      >
        <Carousel.Item>
          <img
              width="100%"
              src={require('../static/mess.png')}
              alt="first slide"
          />
          <Carousel.Caption>
            <h3>Rassemblez vos données</h3>
            <p>
              Thy Art regroupe les données dont vous avez besoin
            </p>
            <br />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
              width="100%"
              src={require('../static/galerie.png')}
              alt="second slide"
          />
          <Carousel.Caption>
            <h3>Pour les galeries</h3>
            <p>
              Outils spécifique pour les besoins d'une galerie d'art.
            </p>
            <br />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
              width="100%"
              src={require('../static/carousel.png')}
              alt="third slide"
          />
          <Carousel.Caption>
            <h3>Thy Art</h3>
            <p>
              Le Tableau de bord pour votre galerie.
            </p>
            <br />
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default CarouselComp;
