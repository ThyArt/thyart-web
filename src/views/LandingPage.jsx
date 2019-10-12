import React from 'react';
import CarouselPage from 'components/Carousel/CarouselPage';
import Services from 'views/Services';
import About from 'components/About/About';
import Profile from 'views/Profil'

export default function LandingPage() {
  return (
    <div>
      <CarouselPage />
      <About />
      <Services />
      <Profile/>
    </div>
  );
}
