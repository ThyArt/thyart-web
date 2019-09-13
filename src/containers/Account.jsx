import React, { Component } from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import Scheduler from '../components/account/Scheduler';
import Profile from '../components/account/Profile';
import Members from '../components/account/Members';
import Artwork from '../components/account/Artwork';
import Clients from '../components/account/Clients';
import Billings from '../components/account/Billings';
import Newsletter from '../components/account/Newsletters';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disconnect } from '../actions/actionsAuth';

import '../css/Account.css';
import Col from 'react-bootstrap/Col';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import Stats from "../components/account/Stats";

export class Account extends Component {
  constructor(props) {
    super(props);
    let token = sessionStorage.getItem("token");

    this.state = {
      selected: "1",
      token: token
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    this.setState({ token: token });
    if (token === null) this.props.dispatch(disconnect());
  }

  handleSelect = eventKey => {
    if (eventKey === '7') {
      this.props.dispatch(disconnect());
      this.setState({ token: null });
      sessionStorage.removeItem('token');
    } else {
      this.setState({ selected: eventKey });
    }
  };

  render() {
    return (
      <div id="accountPage">
        <NotificationContainer />
        <Navbar>
          <Navbar.Brand>
            <img
              src={require('../static/SmallLogo.png')}
              width="50"
              height="100"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Container>
            <Navbar.Text id="title">Ma Gallerie</Navbar.Text>
          </Container>
        </Navbar>
        <Container fluid={true}>
          <Row>
            <Col>
              <div>
                <Nav
                  className="flex-column"
                  variant={'pills'}
                  defaultActiveKey={'1'}
                  onSelect={this.handleSelect}
                >
                  <Nav.Link eventKey={'1'} className="item">
                    Accueil
                  </Nav.Link>
                  <Nav.Link eventKey={'2'} className="item">
                    Statistiques
                  </Nav.Link>
                  <Nav.Link eventKey={'3'} className="item">
                    Oeuvres
                  </Nav.Link>
                  <Nav.Link eventKey={'4'} className="item">
                    Membres
                  </Nav.Link>
                  <Nav.Link eventKey={'8'} className="item">
                    Client
                  </Nav.Link>
                  <Nav.Link eventKey={'5'} className="item">
                    Facturation
                  </Nav.Link>
                  <Nav.Link eventKey={'6'} className="item">
                    Profil
                  </Nav.Link>
                  <Nav.Link eventKey={'9'} className="item">
                    Newsletter
                  </Nav.Link>
                  <Nav.Link eventKey={'7'}>Déconnexion</Nav.Link>
                </Nav>
              </div>
            </Col>
            <Col xs={10}>
              <div>
                {this.state.selected === '1' ? (
                  <Scheduler token={this.state.token} />
                ) : null}
                {this.state.selected === '2' ? (
                    <Stats token={this.state.token} />
                ) : null}
                {this.state.selected === '3' ? (
                    <Artwork token={this.state.token} />
                ) : null}
                {this.state.selected === '4' ? (
                  <Members token={this.state.token} />
                ) : null}
                {this.state.selected === '5' ? (
                    <Billings token={this.state.token} />
                ) : null}
                {this.state.selected === '6' ? (
                  <Profile token={this.state.token} />
                ) : null}
                {this.state.selected === '8' ? (
                  <Clients token={this.state.token} />
                ) : null}
                {this.state.selected === '9' ? (
                    <Newsletter token={this.state.token} />
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
        {this.props.isLogged === false ? (
          <Redirect
            to={{
              pathname: '/signin'
            }}
          />
        ) : null}
      </div>
    );
  }
}

Account.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export function createNotificationError(error) {
  NotificationManager.error(error, "Erreur", 5000);
}

export function createNotificationSuccess(msg) {
  NotificationManager.success(msg, "Succès", 5000);
}

function mapStateToProps(state) {
  const { isLogged } = state.authentication;

  return {
    isLogged
  };
}

export default connect(mapStateToProps)(Account);
