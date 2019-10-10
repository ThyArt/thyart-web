import React, { Component } from "react";
import Header from "../components/Header";
import About from "./About";
import Carousel from "../components/Carousel";
import Contact from "./Contact.jsx";
import Services from "./Services";

import "../assets/css/LandingPage.css";
import { Redirect } from "react-router-dom";

class LandingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem("token");
    this.setState({ token: token });
    if (token !== null)
      this.setState({ isLogged: true });
  }

  render() {
    return (
      <div>
        <Header/>
        <Carousel/>
        <About/>
        <Services/>
        <Contact/>
        {this.state.isLogged ? (
          <Redirect
            to={{
              pathname: "/account"
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default LandingPage;
