import axios from 'axios';
import {apiURL, artWorkURL, billingURL, customerURL} from '../constants/constantsApi';
import {
  OPEN_CREATE_BILLING,
  OPEN_MODIFY_BILLING,
  RECEIVE_BILLING,
  RECEIVE_BILLINGS,
  RECEIVE_BILLINGS_ERROR,
  REQUEST_BILLINGS,
  RECEIVE_BILLINGS_CUSTOMERS,
  RECEIVE_BILLINGS_ARTWORKS,
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

function receiveArtworks(res) {
  var artworks = [];
  res.data.data.forEach(function(value) {
    artworks.push(
        {
          artwork_id: value.id,
          name: value.name,
          key: value.id.toString(),
          price: value.price,
          state: value.state
        });
  });

    return {
      type: RECEIVE_BILLINGS_ARTWORKS,
      artworks: artworks
    };
}

function receiveCustomers(res) {
  return {
    type: RECEIVE_BILLINGS_CUSTOMERS,
    customers: res.data.data,
  };
}

function receiveBillingsError(error) {
  console.log(error);
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_BILLINGS_ERROR,
    error: error_msg
  };
}

function receiveBillings(res, customers, artworks, name) {
  var filteredCustomers;
  var filteredArtworks;
  var billings = [];
  var newValues;

  res.data.data.forEach(function(value) {
    filteredArtworks = artworks.filter(function(artwork) {
      return artwork.artwork_id === value.artwork_id;
    });
    filteredCustomers = customers.filter(function(customer) {
      return customer.id === value.customer_id;
    });

    newValues = {
      artwork: '',
      customer: ''
    };
    if (filteredArtworks.length > 0)
      newValues.artwork = filteredArtworks[0].name;
    if (filteredCustomers.length > 0)
      newValues.customer = filteredCustomers[0].first_name + " " + filteredCustomers[0].last_name;
    Object.assign(value, newValues);
    if ((name == null || name.replace(/\s/g, "").length === 0) ||
        (newValues.artwork.includes(name) || newValues.customer.includes(name)))
    {
      billings.push(
          value
      );
    }
  });

  return {
    type: RECEIVE_BILLINGS,
    billings: billings
  };
}

/*function receiveBillingCreate(res) {
  return {
    type: RECEIVE_BILLING,
    msg: "La facture a été crée"
  };
}*/

/*function receiveBillingDelete(res) {
  return {
    type: RECEIVE_BILLING,
    billing: null,
    msg: "La facture a été supprimée"
  };
}*/

function receiveBilling(res) {
  return {
    type: RECEIVE_BILLING,
    billing: res.data.data
  };
}

function createBilling(
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
      .post(apiURL + billingURL, body, header_auth)
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
        .catch(error => dispatch(receiveBillingsError(error)));
  };
}

function fetchArtWorksByState(token, state) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  console.log('test');

  state = "?state=" + state;
  return dispatch => {
    return axios
        .get(apiURL + artWorkURL + state, header_auth)
        .then(res => dispatch(receiveArtworks(res)))
        .catch(error => dispatch(receiveBillingsError(error)));
  };
}

function fetchArtWorks(token, name) {
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
    name = "?name=" + name;
  return dispatch => {
    return axios
        .get(apiURL + artWorkURL + name, header_auth)
        .then(res => dispatch(receiveArtworks(res, name)))
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

  return (dispatch, getState) => {
    return axios
      .get(apiURL + billingURL, header_auth)
      .then(res => dispatch(receiveBillings(res, getState().billings.customers, getState().billings.artworks, name)))
      .catch(error => dispatch(receiveBillingsError(error)));
  };
}

export function createBillingIfNeeded(
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
      dispatch(requestBillings());
      return dispatch(
        createBilling(
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
      return dispatch(modifyBilling(token,  first_name, last_name, email, phone,
          country, city, address, id, artworkId)).then(() => {
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
      return dispatch(fetchArtWorksByState(token, 'exposed')).then(() => {
        return dispatch(fetchBilling(token, id));
      });
    }
  };
}

export function getArtWorksByStateIfNeeded(token, state) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(fetchArtWorksByState(token, state));
    }
  };
}

export function getBillingsIfNeeded(token, name) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestBillings());
      return dispatch(fetchCustomers(token)).then(() => {
        return dispatch(fetchArtWorks(token)).then(() => {
          return dispatch(fetchBillings(token, name));
        });
      });
    }
  };
}
