import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import '../css/Header.css';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <Navbar id="navBar" fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#carousel">
                                <img src={require('../static/SmallLogo.png')} alt="logo"  id="logo"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse id="links">
                        <Nav>
                            <NavItem href="/#carousel" eventKey={1} id="name">
                                ThyArt
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem href="/#about" eventKey={2}>
                                A propos
                            </NavItem>
                            <NavItem href="/#services" eventKey={3}>
                                Services
                            </NavItem>
                            <NavItem href="/#contact" eventKey={6} id="contactButton">
                                Contact
                            </NavItem>
                            <NavItem href="/signin" eventKey={7}>
                                Connection
                            </NavItem>
                            <NavItem href="/signup" eventKey={8}>
                                Inscription
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
