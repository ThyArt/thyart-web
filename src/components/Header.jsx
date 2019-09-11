import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "../css/Header.css";

class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" id={"NavBar"}>
        <Navbar.Brand href="/">Thy Art</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href="/#about">A propos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/#services">Services</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/#contact">Contact</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signin">Connexion</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signup">Inscription</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
