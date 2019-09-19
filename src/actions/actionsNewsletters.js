import axios from 'axios';
import { apiURL, newsletterURL } from '../constants/constantsApi';
import {
  OPEN_CREATE_NEWSLETTER,
  OPEN_MODIFY_NEWSLETTER,
  RECEIVE_NEWSLETTER,
  RECEIVE_NEWSLETTERS,
  RECEIVE_NEWSLETTERS_ERROR,
  REQUEST_NEWSLETTERS,
  SORT_NEWSLETTERS
} from "../constants/constantsAction";

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

export function openModifyNewsletter() {
  return {
    type: OPEN_MODIFY_NEWSLETTER
  };
}

export const sortNewsletters = sortType => ({
  type: SORT_NEWSLETTERS,
  sortType: sortType
});

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
  token,
  email,
  phone,
  first_name,
  last_name,
  country,
  city,
  address,
  artworkId
) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);

  const body = {
    email: email,
    phone: phone,
    first_name: first_name,
    last_name: last_name,
    country: country,
    city: city,
    address: address,
    artwork_id: artworkId,
    date: today
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

function eraseNewsletter(token, id) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {

    return axios.delete(apiURL + newsletterURL + "/" + id, header_auth)
      .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

function modifyNewsletter(token, first_name, last_name, email,
                       phone, address, city, country, id, artworkId) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };

  const body = {};

  return dispatch => {
    return axios.patch(apiURL + newsletterURL + "/" + id + "?email=" + email
      + "&phone=" + phone + "&first_name=" + first_name + "&last_name=" + last_name
      + "&country=" + country + "&city=" + city + "&address=" + address + "&artworkId=" + artworkId, body, header_auth)
      .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

function fetchNewsletters(token, name) {
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
      .get(apiURL + newsletterURL + name, header_auth)
      .then(res => dispatch(receiveNewsletters(res, name)))
      .catch(error => dispatch(receiveNewslettersError(error)));
  };
}

export function createNewsletterIfNeeded(
  token,
  email,
  phone,
  first_name,
  last_name,
  country,
  city,
  address,
  artworkId
) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
      return dispatch(
        createNewsletter(
          token,
          email,
          phone,
          first_name,
          last_name,
          country,
          city,
          address,
          artworkId
        )
      ).then(() => {
        return dispatch(fetchNewsletters(token, null));
      });
    }
  };
}

export function modifyNewsletterIfNeeded(token, email, phone, first_name,
                                      last_name, country, city, address, id, artworkId) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
      return dispatch(modifyNewsletter(token, email, phone, first_name,
        last_name, country, city, address, id, artworkId)).then(() => {
        return dispatch(fetchNewsletters(token, null));
      });
    }
  };
}

export function eraseNewsletterIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
      return dispatch(eraseNewsletter(token, id)).then(() => {
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

export function getNewslettersIfNeeded(token, name) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestNewsletters());
      return dispatch(fetchNewsletters(token, name));
    }
  };
}
