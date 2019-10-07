import axios from 'axios';
import {apiURL, permissionURL, profileURL, userURL} from '../constants/constantsApi';
import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  RECEIVE_PROFILE_ERROR, RECEIVE_PERMISSIONS
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

function receivePermissions(res) {
  let permissionsName = [
      "ajouter des membres",
      "modifier les roles des membres",
      "ajouter des artistes",
      "voir les artistes enregistrés",
      "modifier un artiste",
      "supprimer un artiste",
      "ajouter un client",
      "voir les clients enregistrés",
      "modifier un client",
      "supprimer un client",
      "ajouter une exposition",
      "voir les expositions enregistrés",
      "modifier une exposition",
      "supprimer une exposition",
      "enregistrer une newsletter",
      "voir les newsletters enregistées",
      "modifier une newsletter",
      "supprimer une newsletter",
      "envoyer une newsletter",
      "ajouter une oeuvre d'art",
      "voir les oeuvres d'art enregistées",
      "modifier une oeuvre d'art",
      "supprimer une oeuvre d'art",
      "ajouter une image à une oeuvre",
      "supprimer une image d'oeuvre d'art"
  ];

  let permissions = [];

  for (let i = 1; i - 1 < permissionsName.length; i++) {
    if (res.data.data.find((data) => {
      return data.id === i ;
    }) !== undefined)
      permissions.push("Peut " + permissionsName[i - 1]);
    else
      permissions.push("Ne peut pas " + permissionsName[i - 1]);
  }

  return {
    type: RECEIVE_PERMISSIONS,
    permissions: permissions
  };
}

function fetchPermissions(token) {
  const header_auth = {
    headers: {
      Accept: "application/json", "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {
    return axios
        .get(apiURL + permissionURL, header_auth)
        .then(res => dispatch(receivePermissions(res)))
        .catch(error => dispatch(receiveProfileError(error)));
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
        return dispatch(fetchPermissions(token)).then(() => {
          return dispatch(fetchProfile(token));
        });
      });
    }
  };
}

export function modifyFirstnameIfNeeded(token, firstname) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyFirstname(token, firstname)).then(() => {
        return dispatch(fetchPermissions(token)).then(() => {
          return dispatch(fetchProfile(token));
        });
      });
    }
  };
}

export function modifyLastnameIfNeeded(token, lastname) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyLastname(token, lastname)).then(() => {
        return dispatch(fetchPermissions(token)).then(() => {
          return dispatch(fetchProfile(token));
        });
      });
    }
  };
}

export function getProfileIfNeeded(token) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(fetchPermissions(token)).then(() => {
        return dispatch(fetchProfile(token));
      });
    }
  };
}

export function modifyMailIfNeeded(token, mail) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestProfile());
      return dispatch(modifyMail(token, mail)).then(() => {
        return dispatch(fetchPermissions(token)).then(() => {
          return dispatch(fetchProfile(token));
        });
      });
    }
  };
}
