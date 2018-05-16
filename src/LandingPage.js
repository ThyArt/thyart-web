import React, { Component } from "react";
import Header from "./Header";

import "./LandingPage.css"

class LandingPage extends Component {
  render() {
    return (
        <div id="landingPage">
          <Header/>
          <div id="content">
            <div>Carousel</div>
            <div>About</div>
            <div>Services</div>
            <div>Pricing</div>
            <div>Blog</div>
            <div>Contact</div>
          </div>
        </div>
    );
  }
}

export default LandingPage;
