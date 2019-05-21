import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../css/Header.css';

class Header extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">

                <Navbar.Brand href="/#carousel">Thy Art</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
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
            /*
            <Navbar id="navBar" fixedTop>
                <Navbar.Brand href="#carousel">
                    <img
                        id="logo"
                        alt="logo"
                        src={require('../static/SmallLogo.png')}
                    />
                </Navbar.Brand>
                <Navbar.Collapse id="links">
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Nav.Link href="/#about" eventKey={2}>
                                A propos
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/#services" eventKey={3}>
                                Services
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/#contact" eventKey={6} id="contactButton">
                                Contact
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/signin" eventKey={7}>
                                Connexion
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/signup" eventKey={8}>
                                Inscription
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>*/
        );
    }
}

export default Header;