import React, { Component } from "react";
import Header from "./Header";
import About from "./About";
import ThyArtCarousel from "./ThyArtCarousel";
import Contact from "./Contact.js"

import "./LandingPage.css"
import ThyArtCarousel from "./ThyArtCarousel";
import ThyArtServices from "./ThyArtServices";

class LandingPage extends Component {
  render() {
    return (
        <div id="landingPage">
          <Header/>
          <div id="content">
            <ThyArtCarousel/>
            <About/>
            <ThyArtServices/>
            <div id="pricing">Pricing</div>
            <div id="blog">Blog</div>
*/}
            <Contact/>
          </div>
        </div>
    );
  }
}

export default LandingPage;
