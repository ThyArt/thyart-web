import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disconnect } from '../actions/actionsAuth';

import '../css/Account.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import ResponsiveDrawer from './SideBar';

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

  callbackFunction = (childData) => {
    console.log(childData);
    this.setState({token: childData})
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
            <Navbar.Text id="title">Ma Galerie</Navbar.Text>
          </Container>
        </Navbar>
        <Container fluid={true}>
              <ResponsiveDrawer token={this.state.token}  parentCallback = {this.callbackFunction}>

              </ResponsiveDrawer>

        </Container>

        {this.state.token === null ? (
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
