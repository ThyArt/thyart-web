import axios from 'axios';
import { apiURL, profileURL, userURL } from '../constants/constantsApi';
import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  RECEIVE_PROFILE_ERROR
} from '../constants/constantsAction';

function shouldFetchApi(state) {
  const isFetching = state.profile.isFetching;

  return !isFetching;
}

export function requestProfile() {
  return {
    type: REQUEST_PROFILE
  };
}

export function receiveProfileError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_PROFILE_ERROR,
    error: error_msg
  };
}

function receiveProfile(res) {
  return {
    type: RECEIVE_PROFILE,
    mail: res.data["data"]["email"],
    firstname: res.data["data"]["firstname"],
    lastname: res.data["data"]["lastname"],
    msg: null,
    role: res.data["data"]["role"]
  };
}

function receiveProfileModify(res) {
  return {
    type: RECEIVE_PROFILE,
    mail: res.data["data"]["email"],
    firstname: res.data["data"]["firstname"],
    lastname: res.data["data"]["lastname"],
    msg: "Votre profil a été modifié",
    role: res.data["data"]["role"]
  };
}

function fetchProfile(token) {
  const header_auth = {
    headers: {
      Accept: "application/json", "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    return axios
      .get(apiURL + profileURL, header_auth)
      .then(res => dispatch(receiveProfile(res)))
      .catch(error => dispatch(receiveProfileError(error)));
  };
}

function modifyMail(token, mail) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/xxx-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };
  const body = {};
  return dispatch => {
    return axios.patch(apiURL + userURL + "?email=" + mail, body, header_auth)
      .then(res => dispatch(receiveProfileModify(res)))
      .catch(error => dispatch(receiveProfileError(error)));
  };
}

function modifyPassword(token, password) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/xxx-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };
  const body = {};
  return dispatch => {
    return axios.patch(apiURL + userURL + "?password=" + password, body, header_auth)
      .then(res => dispatch(receiveProfileModify(res)))
      .catch(error => dispatch(receiveProfileError(error)));
  };
}

function modifyFirstname(token, firstname) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/xxx-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };
  const body = {};
  return dispatch => {
    return axios.patch(apiURL + userURL + "?firstname=" + firstname, body, header_auth)
      .then(res => dispatch(receiveProfileModify(res)))
      .catch(error => dispatch(receiveProfileError(error)));
  };
}

function modifyLastname(token, lastname) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/xxx-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };
  const body = {};
  return dispatch => {
    return axios.patch(apiURL + userURL + "?lastname=" + lastname, body, header_auth)
      .then(res => dispatch(receiveProfileModify(res)))
      .catch(error => dispatch(receiveProfileError(error)));
  };
}

export function modifyPasswordIfNeeded(token, password) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyPassword(token, password)).then(() => {
        return dispatch(fetchProfile(token));
      });
    }
  };
}

export function modifyFirstnameIfNeeded(token, firstname) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyFirstname(token, firstname)).then(() => {
        return dispatch(fetchProfile(token));
      });
    }
  };
}

export function modifyLastnameIfNeeded(token, lastname) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyLastname(token, lastname)).then(() => {
        return dispatch(fetchProfile(token));
      });
    }
  };
}

export function getProfileIfNeeded(token) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(fetchProfile(token));
    }
  };
}

export function modifyMailIfNeeded(token, mail) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyMail(token, mail)).then(() => {
        return dispatch(fetchProfile(token));
      });
    }
  };
}
