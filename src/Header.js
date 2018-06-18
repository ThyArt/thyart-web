import React, { Component } from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import { Link } from 'react-router-dom'

import './Header.css'

class Header extends Component {
  render() {
    return (
        <div id="header">
          <Navbar id="navBar" fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#carousel">
                  <img src={require('./static/SmallLogo.png')} alt="logo" height="70" width="auto" id="logo"/>
                </a>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse id="links">
              <Nav>
                <NavItem href="#carousel" eventKey={1} id="name">
                  ThyArt
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem href="#about" eventKey={2}>
                  About
                </NavItem>
                <NavItem href="#services" eventKey={3}>
                  Services
                </NavItem>
{/*
                TODO:

                <NavItem href="#pricing" eventKey={4}>
                  Pricing
                </NavItem>
                <NavItem href="#blog" eventKey={5}>
                  Blog
                </NavItem>
*/}
                <NavItem href="#contact" eventKey={6} id="contactButton">
                  Contact
                </NavItem>
                <NavItem href="#signin" eventKey={7}>
                  <Link to="/signin">
                    Sign In
                  </Link>
                </NavItem>
                <NavItem href="#signup" eventKey={8}>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    );
  }
}

export default Header;
