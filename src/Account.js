import React, {Component} from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Scheduler from './components/account/Scheduler';
import Profile from './components/account/Profile';

import './Account.css'

class Account extends Component {
  constructor(props) {
    super(props);


    this.state = {
      selected: 1
    };
  }

  handleSelect = eventKey => {
    if (eventKey === 7) {
    //  disconnect user
    } else {
      this.setState({ selected: eventKey });
    }
  };

  render() {
    return (
        <div id='accountPage'>

          <div>
            <Navbar fixedTop id='topBar'>
              <a>
                <img src={require('./static/SmallLogo.png')} alt="logo" height="100" id="logo"/>
              </a>
              <span id='title'>Ma Gallerie</span>
            </Navbar>
          </div>

          <div id='sideNav'>
            <Nav stacked bsStyle='pills' onSelect={this.handleSelect}>
              <NavItem  eventKey={1} className='item'>
                Accueil
              </NavItem>
              <NavItem  eventKey={2} className='item'>
                Statistiques
              </NavItem>
              <NavItem  eventKey={3} className='item'>
                Oeuvres
              </NavItem>
              <NavItem  eventKey={4} className='item'>
                Clients
              </NavItem>
              <NavItem  eventKey={5} className='item'>
                Facturation
              </NavItem>
              <NavItem  eventKey={6} className='item'>
                Profil
              </NavItem>
              <NavItem  eventKey={7}>
                Déconnexion
              </NavItem>
            </Nav>
          </div>

          <div id='calendar'>
            { this.state.selected === 1 ? <Scheduler/> : null }
            { this.state.selected === 6 ? <Profile/> : null }
          </div>

        </div>
    );
  }
}

export default Account;
