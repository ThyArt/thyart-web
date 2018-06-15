import React, { Component } from "react";
import Header from "./Header";
import About from "./About";
import ThyArtCarousel from "./ThyArtCarousel";
import Contact from "./Contact.js"

import "./LandingPage.css"
import Services from "./Services";
import SignIn from "./components/SignIn";

class LandingPage extends Component {
  render() {
    return (
        <div id="landingPage">
          <Header/>
          <div id="content">
            <ThyArtCarousel/>
            <About/>
            <Services/>

              {/*
            TODO:

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
