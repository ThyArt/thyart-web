import axios from 'axios';
import { apiURL, customerURL } from '../constants/constantsApi';
import {
  OPEN_CREATE_CUSTOMER,
  OPEN_MODIFY_CUSTOMER,
  RECEIVE_CUSTOMER,
  RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMERS_ERROR,
  REQUEST_CUSTOMERS, SORT_CUSTOMERS
} from "../constants/constantsAction";
import qs from "qs";

function shouldFetchApi(state) {
  const isFetching = state.artworks.isFetching;

  return !isFetching;
}

function requestCustomers() {
  return {
    type: REQUEST_CUSTOMERS
  };
}

export function openCreateCustomer() {
  return {
    type: OPEN_CREATE_CUSTOMER
  };
}

export function openModifyCustomer() {
  return {
    type: OPEN_MODIFY_CUSTOMER
  };
}

export const sortCustomers = sortType => ({
  type: SORT_CUSTOMERS,
  sortType: sortType
});

function receiveCustomersError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_CUSTOMERS_ERROR,
    error: error_msg
  };
}

function receiveCustomers(res) {
  return {
    type: RECEIVE_CUSTOMERS,
    customers: res.data.data
  };
}

function receiveCustomerCreate(res) {
  return {
    type: RECEIVE_CUSTOMER,
    customer: res.data.data,
    msg: "Client " + res.last_name + "a été crée"
  };
}

function receiveCustomerDelete(res) {
  return {
    type: RECEIVE_CUSTOMER,
    customer: null,
    msg: "Le client a été supprimé"
  };
}

function receiveCustomer(res) {
  return {
    type: RECEIVE_CUSTOMER,
    customer: res.data.data
  };
}

function createCustomer(
  token,
  email,
  phone,
  first_name,
  last_name,
  country,
  city,
  address
) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };
  const body = {
    email: email,
    phone: phone,
    first_name: first_name,
    last_name: last_name,
    country: country,
    city: city,
    address: address
  };
  return dispatch => {
    return axios
      .post(apiURL + customerURL, qs.stringify(body), header_auth)
      .then(res => dispatch(receiveCustomerCreate(res)))
      .catch(error => dispatch(receiveCustomersError(error)));
  };
}

function fetchCustomer(token, id) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    return axios.get(apiURL + customerURL + "/" + id, header_auth)
      .then(res => dispatch(receiveCustomer(res)))
      .catch(error => dispatch(receiveCustomersError(error)));
  };
}

function eraseCustomer(token, id) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {

    return axios.delete(apiURL + customerURL + "/" + id, header_auth)
      .catch(error => dispatch(receiveCustomersError(error)));
  };
}

function modifyCustomer(
  token,
  email,
  phone,
  first_name,
  last_name,
  country,
  city,
  address,
  id
) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };

  const body = {};

  return dispatch => {
    return axios.patch(apiURL + customerURL + "/" + id + "?email=" + email
      + "&phone=" + phone + "&first_name=" + first_name + "&last_name=" + last_name
      + "&country=" + country + "&city=" + city + "&address=" + address, body, header_auth)
      .then(res => dispatch(receiveCustomer(res)))
      .catch(error => dispatch(receiveCustomersError(error)));
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
      .catch(error => dispatch(receiveCustomersError(error)));
  };
}

export function createCustomerIfNeeded(
  token,
  email,
  phone,
  first_name,
  last_name,
  country,
  city,
  address
) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestCustomers());
      return dispatch(
        createCustomer(
          token,
          email,
          phone,
          first_name,
          last_name,
          country,
          city,
          address
        )
      );
    }
  };
}


export function modifyCustomerIfNeeded(
  token,
  email,
  phone,
  first_name,
  last_name,
  country,
  city,
  address,
  id
) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestCustomers());
      return dispatch(modifyCustomer(token, email, phone, first_name,
        last_name, country, city, address, id));
    }
  };
}


export function eraseCustomerIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestCustomers());
      return dispatch(eraseCustomer(token, id)).then(() => {
        return dispatch(fetchCustomers(token, null));
      });
    }
  };
}

export function getCustomerIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestCustomers());
      return dispatch(fetchCustomer(token, id));
    }
  };
}

export function getCustomersIfNeeded(token, name) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestCustomers());
      return dispatch(fetchCustomers(token, name));
    }
  };
}
