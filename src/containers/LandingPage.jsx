import React, { Component } from 'react';
import Header from '../components/Header';
import About from './About';
import Carousel from '../components/Carousel';
import Contact from './Contact.jsx';
import Services from '../Services';

import '../css/LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div id="landingPage">
        <Header />
        <div id="content">
          <Carousel />
          <About />
          <Services />
          {/*
            TODO:

            <div id="pricing">Pricing</div>
            <div id="blog">Blog</div>
*/}
          <Contact />
        </div>
      </div>
    );
  }
}

export default LandingPage;
