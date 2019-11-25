import React from 'react';
import CarouselPage from 'components/Carousel/CarouselPage';
import Services from 'views/Services';
import About from 'components/About/About';
import LandingFooter from 'components/Footer/LandingFooter';
import Pricing from 'views/Pricing';

export default function LandingPage() {
  return (
    <div>
      <CarouselPage />
      <About />
      <Services />
      <Pricing />
      <LandingFooter />
    </div>
  );
}
