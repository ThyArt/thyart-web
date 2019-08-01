import React, { Component } from 'react';
import Header from '../components/Header';
import About from './About';
import Carousel from '../components/Carousel';
import Contact from './Contact.jsx';
import Services from './Services';

import '../css/LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Carousel />
        <About />
        <Services />
        <Contact />
      </div>
    );
  }
}

export default LandingPage;
