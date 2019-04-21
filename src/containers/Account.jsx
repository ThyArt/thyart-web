import React, {Component} from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Scheduler from '../components/account/Scheduler';
import Profile from '../components/account/Profile';
import Members from '../components/account/Members';
import Artwork from '../components/account/Artwork';
import Client from '../components/account/Client';
import Facturation from '../components/account/Facturation';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { disconnect } from "../actions/actions";

import '../css/Account.css'

class Account extends Component {
  constructor(props, context) {
    super(props, context);
    let token = sessionStorage.getItem('token');

    this.state = {
      selected: 1,
      token: token
    };
  }

  componentDidMount(){
    let token = sessionStorage.getItem('token');
    this.setState({token: token})
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
                Membres
              </NavItem>
              <NavItem  eventKey={8} className='item'>
                Client
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
            { this.state.selected === 1 ? <Scheduler token={this.state.token}/> : null }
            { this.state.selected === 4 ? <Members token={this.state.token}/> : null}
            { this.state.selected === 3 ? <Artwork token={this.state.token}/> : null }
            { this.state.selected === 6 ? <Profile token={this.state.token}/> : null }
            { this.state.selected === 8 ? <Client token={this.state.token}/> : null }
            { this.state.selected === 5 ? <Facturation token={this.state.token}/> : null }
          </div>


            {(this.state.token === null) ? (
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
    isFetching: PropTypes.bool.isRequired,
    token: PropTypes.string,
    msg: PropTypes.string,
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isLogged,
        isFetching,
        msg,
        error
    } = state;

    return {
        isLogged,
        isFetching,
        msg,
        error
    }
}

export default connect(mapStateToProps)(Account);
