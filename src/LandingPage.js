import React, { Component } from "react";
import Header from "./Header";
import About from "./About";

import "./LandingPage.css"
import ThyArtCarousel from "./ThyArtCarousel";

class LandingPage extends Component {
  render() {
    return (
        <div id="landingPage">
          <Header/>
          <div id="content">
            <ThyArtCarousel/>
            <About/>
            <div id="services">Services</div>
            <div id="pricing">Pricing</div>
            <div id="blog">Blog</div>
            <div id="contact">Contact</div>
          </div>
        </div>
    );
  }
}

export default LandingPage;
