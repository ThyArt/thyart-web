import axios from 'axios';
import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS_ERROR,
  RECEIVE_ADDIMAGE,
  RECEIVE_ARTWORK,
  RECEIVE_ARTWORKCREATE,
  RECEIVE_ARTWORKS
} from '../constants/constantsAction';
import { apiURL, artWorkURL } from '../constants/constantsApi';

function shouldFetchApi(state) {
  const isFetching = state.artworks.isFetching;

  return !isFetching;
}

function requestArtworks() {
  return {
    type: REQUEST_ARTWORKS
  };
}

function receiveArtworksError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else error_msg = 'Erreur inconnue.';

  return {
    type: RECEIVE_ARTWORKS_ERROR,
    error: error_msg
  };
}

function receiveArtworks(res) {
  let artworks = [];
  let src;

  for (const [, value] of Object.entries(res.data.data)) {
    if (value.images != null && value.images[0] && value.images[0].url != null)
      src = value.images[0].url;
    else src = '';
    artworks.push({
      src: src,
      name: value.name,
      key: value.id.toString(),
      width: 3,
      height: 3,
      price: value.price,
      state: value.state
    });
  }
  return {
    type: RECEIVE_ARTWORKS,
    artworks: artworks
  };
}

function receiveArtwork(res) {
  return {
    type: RECEIVE_ARTWORK,
    artwork: res.data.data,
    msg: null
  };
}

function receiveArtWorkCreate(res) {
  return {
    type: RECEIVE_ARTWORKCREATE,
    id: res.data.data['id'].toString(),
    msg: res.data.data['name'] + ' a été crée'
  };
}

function receiveAddImage(res) {
  return {
    type: RECEIVE_ADDIMAGE,
    msg: 'Image téléchargée avec succès.'
  };
}

function receiveArtworkModify(res) {
  return {
    type: RECEIVE_ARTWORKS,
    artwork: res.data.data,
    msg: res.data.data['name'] + ' a été modifié'
  };
}

function receiveArtworkDelete(res) {
  return {
    type: RECEIVE_ARTWORK,
    artwork: res.data.data,
    msg: res.data.data['name'] + 'a été supprimé'
  };
}

function eraseArtwork(token, id) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  return dispatch => {
    return axios
      .delete(apiURL + artWorkURL + '/' + id, header_auth)
      .then(res => dispatch(receiveArtworkDelete(res)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

function createArtWork(file, token, name, price, ref, state) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };
  const body = {
    name: name,
    price: price,
    ref: ref,
    state: state
  };
  return dispatch => {
    return axios
      .post(apiURL + artWorkURL, body, header_auth)
      .then(res => dispatch(receiveArtWorkCreate(res, file, token)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

function uploadImage(token, file, id) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token
    }
  };
  let form = new FormData();
  form.append('images[]', file);
  let url = artWorkURL + '/' + id + '/image';
  return dispatch => {
    return axios
      .post(apiURL + url, form, header_auth)
      .then(res => dispatch(receiveAddImage(res)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

function modifyArtWork(token, name, ref, state, price, id) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token
    }
  };

  const body = {};

  return dispatch => {
    return axios
      .patch(
        apiURL +
          artWorkURL +
          '/' +
          id +
          '?name=' +
          name +
          '&state=' +
          state +
          '&ref=' +
          ref +
          '&price=' +
          price,
        body,
        header_auth
      )
      .then(res => dispatch(receiveArtworkModify(res)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

function fetchArtWork(token, id) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  return dispatch => {
    return axios
      .get(apiURL + artWorkURL + '/' + id, header_auth)
      .then(res => dispatch(receiveArtwork(res)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

function fetchArtWorksByState(token, state) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  state = '?state=' + state;
  return dispatch => {
    return axios
      .get(apiURL + artWorkURL + state, header_auth)
      .then(res => dispatch(receiveArtworks(res)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

function fetchArtWorks(token, name) {
  const header_auth = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  if (name == null || name.replace(/\s/g, '').length === 0) name = '/';
  else name = '?name=' + name;
  return dispatch => {
    return axios
      .get(apiURL + artWorkURL + name, header_auth)
      .then(res => dispatch(receiveArtworks(res, name)))
      .catch(error => dispatch(receiveArtworksError(error)));
  };
}

export function createArtworkIfNeeded(file, token, name, price, ref, state) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(createArtWork(file, token, name, price, ref, state)).then(
        () => {
          return dispatch(
            uploadImage(token, file, getState().artworks.artistId)
          ).then(() => {
            return dispatch(fetchArtWorks(token));
          });
        }
      );
    }
  };
}

export function uploadImageIfNeeded(file, token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(uploadImage(file, token, id));
    }
  };
}

export function sortArtworkByState(token, state) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(fetchArtWorksByState(token, state));
    }
  };
}

export function getArtWorksIfNeeded(token, name) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(fetchArtWorks(token, name));
    }
  };
}

export function getArtWorkIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(fetchArtWork(token, id));
    }
  };
}

export function modifyArtWorkIfNeeded(token, title, ref, state, price, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(modifyArtWork(token, title, ref, state, price, id)).then(
        () => {
          return dispatch(fetchArtWorks(token));
        }
      );
    }
  };
}

export function eraseArtworkIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestArtworks());
      return dispatch(eraseArtwork(token, id)).then(() => {
        return dispatch(fetchArtWorks(token));
      });
    }
  };
}
