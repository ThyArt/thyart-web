import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import '../css/Carousel.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <Container fluid id={'container'}>
        <Row>
          <Col id={'carouselCol'}>
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={this.handleSelect}
            >
              <Carousel.Item>
                <img
                  id={'images'}
                  src={require('../static/mess.png')}
                  alt="first slide"
                />
                <Carousel.Caption className="CaptionBlackText">
                  <h3>Rassemblez vos données</h3>
                  <p>Thy Art regroupe les données dont vous avez besoin</p>
                  <br />
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  id={'images'}
                  src={require('../static/galerie.png')}
                  alt="second slide"
                />
                <Carousel.Caption>
                  <h3>Pour les galeries</h3>
                  <p>Outils spécifique pour les besoins d'une galerie d'art.</p>
                  <br />
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  id={'images'}
                  src={require('../static/carousel.png')}
                  alt="third slide"
                />
                <Carousel.Caption>
                  <h3>Thy Art</h3>
                  <p>Le Tableau de bord pour votre galerie.</p>
                  <br />
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CarouselComp;
