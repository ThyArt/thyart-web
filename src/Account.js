import React, {Component} from "react";
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Navbar } from "react-bootstrap";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import './Account.css'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

// Calendar local
const local = BigCalendar.momentLocalizer(moment);

class Account extends Component {
  constructor(props) {
    super(props);


    this.state = {
      events: [
        {
          title: "Mon exposition",
          allDay: true,
          start: moment(),
          end: moment().add(5, 'days')
        },
        {
          title: "Ma deuxième exposition",
          allDay: true,
          start: moment().add(10, 'days'),
          end: moment().add(13, 'days')
        }

      ],
    };
  }

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
              <NavText className="navText">
                Acceuil
              </NavText>
            </NavItem>
            <NavItem eventKey="statistiques">
              <NavText className="navText">
                Statistiques
              </NavText>
            </NavItem>
            <NavItem id="navItem" eventKey="oeuvres">
              <NavText className="navText">
                Oeuvres
              </NavText>
            </NavItem>
            <NavItem eventKey="Clients">
              <NavText className="navText">
                Clients
              </NavText>
            </NavItem>
            <NavItem eventKey="Facturation">
              <NavText className="navText">
                Facturation
              </NavText>
            </NavItem>
            <h6 id="splitSideBar">
              <span>______________</span>
            </h6>
            <NavItem eventKey="Profil">
              <NavText className="navText">
                Profil
              </NavText>
            </NavItem>
            <NavItem eventKey="Deconnection">
              <NavText className="navText">
                Déconnection
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

        <div id='calendar'>
          <BigCalendar
              localizer={local}
              views={['month', 'agenda']}
              onView={() => {}}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
          />
        </div>
      </div>
    );
  }
}

export default Account;
