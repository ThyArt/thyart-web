import React, {Component} from "react";
import { Navbar, Nav } from "react-bootstrap";
import Scheduler from '../components/account/Scheduler';
import Profile from '../components/account/Profile';
import Members from '../components/account/Members';
import Artwork from '../components/account/Artwork';
import Client from '../components/account/Client';
import Billings from '../components/account/Billings';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { disconnect} from "../actions/actionsAuth";

import '../css/Account.css'

export class Account extends Component {
  constructor(props) {
    super(props);
    let token = sessionStorage.getItem('token');

    this.state = {
      selected: 1,
      token: token
    };
  }

  componentDidMount(){
    let token = sessionStorage.getItem('token');
    this.setState({token: token});
    if (token === null)
      this.props.dispatch(disconnect());
  }

  handleSelect = eventKey => {
    if (eventKey === 7) {
        this.props.dispatch(disconnect());
        this.setState({token: null});
        sessionStorage.removeItem('token');
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
                <img src={require('../static/SmallLogo.png')} alt="logo" height="100" id="logo"/>
              </a>
              <span id='title'>Ma Gallerie</span>
            </Navbar>
          </div>

          <div id='sideNav'>
            <Nav stacked bsStyle='pills' onSelect={this.handleSelect}>
              <Nav.Link  eventKey={1} className='item'>
                Accueil
              </Nav.Link>
              <Nav.Link  eventKey={2} className='item'>
                Statistiques
              </Nav.Link>
              <Nav.Link  eventKey={3} className='item'>
                Oeuvres
              </Nav.Link>
              <Nav.Link  eventKey={4} className='item'>
                Membres
              </Nav.Link>
              <Nav.Link  eventKey={8} className='item'>
                Client
              </Nav.Link>
              <Nav.Link  eventKey={5} className='item'>
                Facturation
              </Nav.Link>
              <Nav.Link  eventKey={6} className='item'>
                Profil
              </Nav.Link>
              <Nav.Link  eventKey={7}>
                Déconnexion
              </Nav.Link>
            </Nav>
          </div>

          <div id='calendar'>
            { this.state.selected === 1 ? <Scheduler token={this.state.token}/> : null }
            { this.state.selected === 4 ? <Members token={this.state.token}/> : null}
            { this.state.selected === 3 ? <Artwork token={this.state.token}/> : null }
            { this.state.selected === 6 ? <Profile token={this.state.token}/> : null }
            { this.state.selected === 8 ? <Client token={this.state.token}/> : null }
            { this.state.selected === 5 ? <Billings token={this.state.token}/> : null }
          </div>


          {(this.props.isLogged === false) ? (
            <Redirect
              to={{
                pathname: '/signin',
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

function mapStateToProps(state) {
    const {
        isLogged,
    } = state.authentication;

    return {
        isLogged
    }
}

export default connect(mapStateToProps)(Account);
