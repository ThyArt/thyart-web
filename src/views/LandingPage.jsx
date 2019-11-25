import React from 'react';
import CarouselPage from 'components/Carousel/CarouselPage';
import Services from 'views/Services';
import About from 'components/About/About';
import LandingFooter from 'components/Footer/LandingFooter';

export default function LandingPage() {
  return (
    <div>
      <CarouselPage />
      <About />
      <Services />
      <LandingFooter/>
    </div>
  );
}
