import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormControl,
  Button,
  Alert,
  FormGroup,
  FormLabel} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {fetchForgotIfNeeded, signInIfNeeded} from "../actions/actionsAuth";
import ReactLoading from 'react-loading';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);

    this.state = {
      mailValue: '',
      passValue: '',
    };
  }

  signin = () => {
    if (
      this.getMailValidationState() === 'success' &&
      this.getPassValidationState() === 'success' &&
      this.state.passValue !== ''
    ) {
      this.props.dispatch(signInIfNeeded(this.state.mailValue, this.state.passValue));
    }
  };

  forgot = () => {
    if (this.getMailValidationState() === 'success') {
      this.props.dispatch(fetchForgotIfNeeded(this.state.mailValue));
    }
  };

  getMailValidationState() {
    let email = this.state.mailValue;
    if (email === '') return null;
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getPassValidationState() {
    let password = this.state.passValue;
    if (password === '') return null;
    let strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    let mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    if (strongRegex.test(password) || mediumRegex.test(password)) {
      return 'success';
    } else if (password !== '') {
      return 'warning';
    } else {
      return 'error';
    }
  }

  handleMailChange(e) {
    this.setState({mailValue: e.target.value});
  }

  handlePassChange(e) {
    this.setState({passValue: e.target.value});
  }

  render() {
    return (
      <Form>
        <FormGroup
          controlId="formValidationNull"
          validationState={this.getMailValidationState()}
        >
          <FormLabel>Entrez votre email</FormLabel>
          <FormControl
            type="email"
            value={this.state.mailValue}
            onChange={this.handleMailChange}
          />
          <FormControl.Feedback/>
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getPassValidationState()}
        >
          <FormLabel>Entrez votre mot de passe</FormLabel>
          <FormControl
            type="password"
            value={this.state.passValue}
            onChange={this.handlePassChange}
          />
          <FormControl.Feedback/>
        </FormGroup>
        <container >
          <Row>
            <Col>
              {this.props.isFetching ? (
                  <ReactLoading type={'spin'} color={'black'} height={50} width={50}/>
              ) : (
                  <Button variant={"outline-primary"} onClick={this.signin}>Se connecter</Button>
              )
              }
            </Col>
            <Col>
              {this.props.isFetching ? (
                  <div/>) : (
                  <Button className='float-right' variant={"outline-secondary"} onClick={this.forgot}>Mot de passe oublié</Button>
              )
              }
            </Col>
          </Row>
        </container>
        {this.props.error ? (
          <Alert bsStyle="danger">{`Error: ${
            this.props.error
            }`}</Alert>
        ) : null}
        {this.props.isLogged ? (
          <Redirect
            to={{
              pathname: '/account',
            }}
          />
        ) : null}
      </Form>
    );
  }
}

SignInForm.propTypes = {
  isLogged: PropTypes.bool,
  isFetching: PropTypes.bool,
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
  } = state.authentication;

  return {
    isLogged,
    isFetching,
    msg,
    error
  }
}

export default connect(mapStateToProps)(SignInForm);
