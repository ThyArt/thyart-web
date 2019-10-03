import axios from 'axios';
import {apiURL, customerURL, newsletterURL} from '../constants/constantsApi';
import {
  OPEN_CREATE_NEWSLETTER,
  RECEIVE_NEWSLETTER,
  RECEIVE_NEWSLETTERS,
  RECEIVE_NEWSLETTERS_ERROR,
  REQUEST_NEWSLETTERS,
  RECEIVE_NEWSLETTERS_CUSTOMERS
} from "../constants/constantsAction";
import {getCustomersIfNeeded} from "./actionsCustomers";

function shouldFetchApi(state) {
  const isFetching = state.newsletters.isFetching;

  return !isFetching;
}

function requestNewsletters() {
  return {
    type: REQUEST_NEWSLETTERS
  };
}

export function openCreateNewsletter() {
  return {
    type: OPEN_CREATE_NEWSLETTER
  };
}

export const sortNewsletters = sortType => ({
  type: SORT_NEWSLETTERS,
  sortType: sortType
});

function receiveCustomers(res) {
  return {
  type: RECEIVE_NEWSLETTERS_CUSTOMERS,
    customers: res.data.data,
  };
}

function receiveNewslettersError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_NEWSLETTERS_ERROR,
    error: error_msg
  };
}

function receiveNewsletters(res) {
  return {
    type: RECEIVE_NEWSLETTERS,
    newsletters: res.data.data
  };
}

/*function receiveNewsletterCreate(res) {
  return {
    type: RECEIVE_NEWSLETTER,
    msg: "La facture a été crée"
  };
}*/

/*function receiveNewsletterDelete(res) {
  return {
    type: RECEIVE_NEWSLETTER,
    newsletter: null,
    msg: "La facture a été supprimée"
  };
}*/

function receiveNewsletter(res) {
  return {
    type: RECEIVE_NEWSLETTER,
    newsletter: res.data.data
  };
}

function createNewsletter(
  subject,
  description,
  token
) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  const body = {
    subject: subject,
    description: description
  };
  return dispatch => {
    return axios
      .post(apiURL + newsletterURL, body, header_auth)
      .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

function fetchNewsletter(token, id) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    return axios.get(apiURL + newsletterURL + "/" + id, header_auth)
      .then(res => dispatch(receiveNewsletter(res)))
      .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

function fetchCustomers(token, name) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  if (name == null || name.replace(/\s/g, "").length === 0)
    name = "/";
  else
    name = "?last_name=" + name;
  return dispatch => {
    return axios
        .get(apiURL + customerURL + name, header_auth)
        .then(res => dispatch(receiveCustomers(res, name)))
        .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

function fetchNewsletters(token) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    return axios
      .get(apiURL + newsletterURL, header_auth)
      .then(res => dispatch(receiveNewsletters(res)))
      .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

export function createNewsletterIfNeeded(
  subject,
  description,
  token
) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
        return dispatch(
            createNewsletter(
                subject,
                description,
                token
            )
        ).then(() => {
          return dispatch(fetchNewsletters(token, null));
        });
    }
  };
}

export function getNewsletterIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
      return dispatch(fetchNewsletter(token, id));
    }
  };
}

export function getNewslettersIfNeeded(token) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
      return dispatch(fetchNewsletters(token));
    }
  };
}
