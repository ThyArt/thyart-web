import React, {Component} from "react";

import './Account.css'
import {Nav, Navbar, NavItem, } from "react-bootstrap";


class Account extends Component {
  render() {
    return (
        <div>
            <div>
                <Navbar id="navBarAccount" fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>
                                <img src={require('./static/SmallLogo.png')} alt="logo" height="100" width="auto" id="logo"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                </Navbar>
            </div>



            <div >
                <nav className="col-md-2">
                    <Navbar id="sideBar">
                        <div className="sidebar-sticky">
                            <ul className="nav nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#" id="nav-link">
                                        Dashboard
                                        <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"  id="nav-link">
                                        Orders
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" id="nav-link">
                                        Factu
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" id="nav-link">
                                        Stats
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" id="nav-link">
                                        Oeuvre
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" id="nav-link">
                                        Client
                                    </a>
                                </li>
                            </ul>
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span id="nav-link">_____________</span>
                            </h6>
                            <ul className="nav flex-column mb-2">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" id="nav-link">
                                        profil
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" id="nav-link">
                                        deco
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Navbar>
                </nav>
            </div>
        </div>
    );
  }
}

export default Account;
