import React, { Component } from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";

import './Header.css'

class Header extends Component {
  render() {
    return (
        <div id="header">
          <Navbar id="navBar" staticTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">
                  <img src={require('./static/SmallLogo.png')} alt="logo" height="70" width="auto" id="logo"/>
                </a>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse id="links">
              <Nav>
                <NavItem href="#" eventKey={1} id="name">
                  ThyArt
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem href="#" eventKey={2}>
                  About
                </NavItem>
                <NavItem href="#" eventKey={3}>
                  Services
                </NavItem>
                <NavItem href="#" eventKey={4}>
                  Pricing
                </NavItem>
                <NavItem href="#" eventKey={5}>
                  Blog
                </NavItem>
                <NavItem href="#" eventKey={6} id="contact">
                  Contact
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    );
  }
}

export default Header;
