import axios from "axios";
import { apiURL, billingURL } from "../constants/constantsApi";
import {
  OPEN_CREATE_BILLING,
  OPEN_MODIFY_BILLING,
  RECEIVE_BILLING,
  RECEIVE_BILLINGS,
  RECEIVE_BILLINGS_ERROR,
  REQUEST_BILLINGS,
  SORT_BILLINGS
} from "../constants/constantsAction";

function shouldFetchApi(state) {
  const isFetching = state.billings.isFetching;

  return !isFetching;
}

function requestBillings() {
  return {
    type: REQUEST_BILLINGS
  };
}

export function openCreateBilling() {
  return {
    type: OPEN_CREATE_BILLING
  };
}

export function openModifyBilling() {
  return {
    type: OPEN_MODIFY_BILLING
  };
}

export const sortBillings = sortType => ({
  type: SORT_BILLINGS,
  sortType: sortType
});

function receiveBillingsError(error) {
  let error_msg;
  if (
    error.response &&
    error.response.data &&
    error.response.data.message
  )
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_BILLINGS_ERROR,
    error: error_msg
  };
}

function receiveBillings(res) {
  return {
    type: RECEIVE_BILLINGS,
    billings: res.data.data
  };
}

function receiveBillingCreate(res) {
  return {
    type: RECEIVE_BILLING,
    msg: "La facture a été crée"
  };
}

function receiveBillingDelete(res) {
  return {
    type: RECEIVE_BILLING,
    billing: null,
    msg: "La facture a été supprimée"
  };
}

function receiveBilling(res) {
  return {
    type: RECEIVE_BILLING,
    billing: res.data.data
  };
}

function createBilling(token, email, phone, first_name,
                       last_name, country, city, address, artworkId) {
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
  var today = yyyy + "-" + mm + "-" + dd;
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
    return axios.post(apiURL + billingURL, body, header_auth)
      .catch(error => dispatch(receiveBillingsError(error)));
  };
}


function fetchBilling(token, id) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    return axios.get(apiURL + billingURL + "/" + id, header_auth)
      .then(res => dispatch(receiveBilling(res)))
      .catch(error => dispatch(receiveBillingsError(error)));
  };
}

function eraseBilling(token, id) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {

    return axios.delete(apiURL + billingURL + "/" + id, header_auth)
      .catch(error => dispatch(receiveBillingsError(error)));
  };
}

function modifyBilling(token, first_name, last_name, email,
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
    return axios.patch(apiURL + billingURL + "/" + id + "?email=" + email
      + "&phone=" + phone + "&first_name=" + first_name + "&last_name=" + last_name
      + "&country=" + country + "&city=" + city + "&address=" + address + "&artworkId=" + artworkId, body, header_auth)
      .catch(error => dispatch(receiveBillingsError(error)));
  };
}

function fetchBillings(token, name) {
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

    return axios.get(apiURL + billingURL + name, header_auth)
      .then(res => dispatch(receiveBillings(res, name)))
      .catch(error => dispatch(receiveBillingsError(error)));
  };
}

export function createBillingIfNeeded(token, email, phone, first_name,
                                      last_name, country, city, address, artworkId) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(createBilling(token, email, phone, first_name, last_name, country, city, address, artworkId)).then(() => {
        return dispatch(fetchBillings(token, null));
      });
    }
  };
}

export function modifyBillingIfNeeded(token, email, phone, first_name,
                                      last_name, country, city, address, id, artworkId) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(modifyBilling(token, email, phone, first_name,
        last_name, country, city, address, id, artworkId)).then(() => {
        return dispatch(fetchBillings(token, null));
      });
    }
  };
}

export function eraseBillingIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(eraseBilling(token, id)).then(() => {
        return dispatch(fetchBillings(token, null));
      });
    }
  };
}

export function getBillingIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(fetchBilling(token, id));
    }
  };
}

export function getBillingsIfNeeded(token, name) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(fetchBillings(token, name));
    }
  };
}
