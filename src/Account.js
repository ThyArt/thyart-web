import React, {Component} from "react";

import './Account.css'
import {Navbar} from "react-bootstrap";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

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
                        <NavItem>
                        <NavText>
                            <h1 style={{color: "white", textAlign :"center"}}>
                                Ma gallerie
                            </h1>
                        </NavText>
                        </NavItem>

                </Navbar>
            </div>


            <SideNav id="sideNav" >
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavText id="navText">
                            Acceuil
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="statistiques">
                        <NavText id="navText">
                            Statistiques
                        </NavText>
                    </NavItem>
                    <NavItem id="navItem" eventKey="oeuvres">
                        <NavText id="navText">
                            Oeuvres
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Clients">
                        <NavText id="navText">
                            Clients
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Facturation">
                        <NavText id="navText">
                            Facturation
                        </NavText>
                    </NavItem>
                    <h6 id="splitSideBar">
                        <span>______________</span>
                    </h6>
                    <NavItem eventKey="Facturation">
                        <NavText id="navText">
                            Profil
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Deconnection">
                        <NavText id="navText">
                            Déconnection
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
  }
}

export default Account;
