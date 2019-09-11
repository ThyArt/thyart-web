import axios from 'axios';
import {
  RECEIVE_SIGN_IN,
  RECEIVE_SIGN_UP,
  RECEIVE_PWD,
  DISCONNECT,
  REQUEST_AUTH,
  RECEIVE_AUTH_ERROR
} from '../constants/constantsAction';

import {
  clientID,
  clientSecret,
  apiURL,
  userURL,
  tokenURL,
  header,
  pwdURL
} from '../constants/constantsApi';

function shouldFetchApi(state) {
  const isFetching = state.authentication.isFetching;

  return !isFetching;
}

function requestAuth() {
  return {
    type: REQUEST_AUTH
  };
}

function receiveSignInError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_AUTH_ERROR,
    error: error_msg
  };
}

function receiveSignUpError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.messages)
    error_msg = error.response.data.messages[0];
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_AUTH_ERROR,
    error: error_msg
  };
}

function receiveSignIn(res) {
  sessionStorage.setItem("token", res.data["access_token"]);
  return {
    type: RECEIVE_SIGN_IN,
    msg: "Connecté"
  };
}

function receiveSignUp(res) {
  return {
    type: RECEIVE_SIGN_UP,
    msg: "Félicitation, vous êtes inscris! Vous pouvez maintenant vous connecter à votre compte."
  };
}

function receivePwd(res) {
  return {
    type: RECEIVE_PWD,
    msg: "Un email a été envoyé à l'adresse indiquée"
  };
}

function fetchSignIn(username, password) {
  return dispatch => {
    const body = {
      grant_type: "password",
      client_id: clientID,
      client_secret: clientSecret,
      username: username,
      password: password,
      scope: "*"
    };

    return axios
      .post(apiURL + tokenURL, body, header)
      .then(res => dispatch(receiveSignIn(res)))
      .catch(error => dispatch(receiveSignInError(error)));
  };
}

function fetchSignUp(username, firstname, lastname, mail, password) {
  const body = {
    name: mail,
    firstname: firstname,
    lastname: lastname,
    email: mail,
    password: password
  };
  return dispatch => {
    return axios
      .post(apiURL + userURL, body, header)
      .then(res => dispatch(receiveSignUp(res)))
      .catch(error => dispatch(receiveSignUpError(error)));
  };
}

function fetchForgot(mail) {
  const body = {
    email: mail,
    endpoint: apiURL
  };
  return dispatch => {
    return axios
      .post(apiURL + pwdURL, body, header)
      .then(res => dispatch(receivePwd(res)))
      .catch(error => dispatch(receiveSignInError(error)));
  };
}

export function signInIfNeeded(username, password) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestAuth());
      return dispatch(fetchSignIn(username, password));
    }
  };
}

export function signUpIfNeeded(username, firstname, lastname, mail, password) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestAuth());
      return dispatch(fetchSignUp("username", firstname, lastname, mail, password));
    }
  };
}

export function fetchForgotIfNeeded(mail) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestAuth());
      return dispatch(fetchForgot(mail));
    }
  };
}

export function disconnect() {
  return {
    type: DISCONNECT
  };
}
