import React from 'react';
import carImgCarousel from 'assets/img/carousel.png';
import carImgGalerie from 'assets/img/galerie.png';
import carImgMess from 'assets/img/mess.png';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import './slider-animations.css';
import './styles.css';

const content = [
  {
    title: "L'outil pour les Galeristes",
    description: 'ThyArt est conçu avec des galeristes pour les galeristes !',
    image: carImgGalerie
  },
  {
    title: 'Rassemblez vos données',
    description: 'ThyArt regroupe ce qui est important pour vous !',
    image: carImgMess
  },
  {
    title: 'ThyArt',
    description: 'Le tableau de bord pour les galeries',
    image: carImgCarousel
  }
];

export default function CarouselPage() {
  return (
    <Slider className="slider-wrapper">
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}
