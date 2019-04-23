import axios from "axios/index";

export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN';
export const RECEIVE_SIGN_UP = 'RECEIVE_SIGN_UP';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const REQUEST_API = 'REQUEST_API';
export const DISCONNECT = 'DISCONNECT';
export const RECEIVE_PWD = 'RECEIVE_PWD';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_ARTWORKS = 'RECEIVE_ARTWORKS';
export const RECEIVE_ARTWORK = 'RECEIVE_ARTWORK';
export const RECEIVE_ARTWORKCREATE = 'RECEIVE_ARTWORKCREATE';
export const RECEIVE_ADDIMAGE = 'RECEIVE_ADDIMAGE';
export const ADD_BILLING = 'ADD_BILLING';
export const DELETE_BILLING = 'DELETE_BILLING';
export const SET_CURRENT_BILLING = 'SET_CURRENT_BILLING';

//const apiURL = 'http://thyart-api-dev.eu-west-1.elasticbeanstalk.com/';
const apiURL = 'http://localhost:80/';
const userURL = 'api/user';
const tokenURL = 'oauth/token';
const pwdURL = 'api/password/create';
const profileURL = 'api/user/self';
const artWorkURL = 'api/artwork';
const artWorkImg = '/image';

const header = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
};
const clientID = 2;
const clientSecret = 'vMJibGy1LLl1Jb2GFY1GrCewg3ggZreCoLkgGlVj';



function requestApi() {
    return {
        type: REQUEST_API
    }
}

export function disconnect(){
 return {
     type: DISCONNECT
 }
}

function receiveSignIn(res) {
    sessionStorage.setItem('token', res.data['access_token']);
    return {
        type: RECEIVE_SIGN_IN,
        msg: "Connected",
        token: res.data['access_token'],
    }
}

function receiveSignUp(res) {
    return {
        type: RECEIVE_SIGN_UP,
        msg: "Congratulation, you are registered! you can now connect to your account."
    }
}

function receivePwd(res) {
    return {
        type: RECEIVE_PWD,
        msg: "Congratulation email sent successfully"
    }
}

function receiveProfile(res) {
    return  {
        type: RECEIVE_PROFILE,
        mail: res.data['data']['email'],
        firstname: res.data['data']['firstname'],
        lastname: res.data['data']['lastname']
    }
}

function receiveArtworks(res) {

    let artworks = [];
    let src;

    for (const [key, value] of Object.entries(res.data.data)) {
        if (value.images != null && value.images[0] && value.images[0].url != null)
            src = value.images[0].url;
        else
            src = '';
        artworks.push(
            {
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
        artworks: artworks,
    }
}

function receiveArtwork(res) {
    return {
        type: RECEIVE_ARTWORK,
        artwork: res.data.data
    }
}

function receiveArtWorkCreate(res) {
    return {
        type: RECEIVE_ARTWORKCREATE,
        id: res.data['data']['id'].toString()
    }
}

function receiveAddImage(res) {
    return {
        type: RECEIVE_ADDIMAGE,
        msg: 'Image uploaded with success.'
    }
}

function receiveError(error) {
    let error_msg;
    if (
        error.response &&
        error.response.data &&
        error.response.data.message
    )
        error_msg = error.response.data.message;
    else
        error_msg = 'Unknown error.';

    return {
        type: RECEIVE_ERROR,
        error: error_msg
    }
}

function fetchSignIn(username, password) {
    return dispatch => {
        const body = {
            grant_type: 'password',
            client_id: clientID,
            client_secret: clientSecret,
            username: username,
            password: password,
            scope: '*'
        };

        return axios.post(apiURL + tokenURL, body, header)
            .then(res => dispatch(receiveSignIn(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function fetchSignUp(name, firstname, lastname, mail, password) {

    const body = {
        name: name,
        firstname: firstname,
        lastname: lastname,
        email: mail,
        password: password
    };
    return dispatch => {
        return axios.post(apiURL + userURL, body, header)
            .then(res => dispatch(receiveSignUp(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function fetchForgot(mail) {
    const body = {
        email: mail,
        endpoint: 'http://thyart.dev.s3-website-eu-west-1.amazonaws.com'
    };
    return dispatch => {
        return axios.post(apiURL + pwdURL, body, header)
            .then(res => dispatch(receivePwd(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function fetchProfile(token) {
    const header_auth = {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token }
        };
    return dispatch => {
        return axios.get(apiURL + profileURL, header_auth)
            .then(res => dispatch(receiveProfile(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function eraseArtwork(token, id) {
  const header_auth = {
    headers: { Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token }
  };


  return dispatch => {

    return axios.delete(apiURL + artWorkURL + '/' + id, header_auth)
      .then(dispatch(fetchArtWorks(token)))
      .catch(error => dispatch(receiveError(error)));
  }
}

function modifyMail(token, mail) {
  const header_auth = {
    headers: { Accept: 'application/json',
      'Content-Type': 'application/xxx-form-urlencoded',
      Authorization: 'Bearer ' + token }
  };
  const body = { };
  return dispatch => {
    return axios.patch(apiURL + userURL + "?email="+mail, body, header_auth)
      .then(res => dispatch(receiveProfile(res)))
      .catch(error => dispatch(receiveError(error)))
  }
}

function modifyPassword(token, password) {
  const header_auth = {
    headers: { Accept: 'application/json',
      'Content-Type': 'application/xxx-form-urlencoded',
      Authorization: 'Bearer ' + token }
  };
  const body = { };
  return dispatch => {
    return axios.patch(apiURL + userURL + "?password="+ password, body, header_auth)
      .then(res => dispatch(receiveProfile(res)))
      .catch(error => dispatch(receiveError(error)))
  }
}

function modifyFirstname(token, firstname) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/xxx-form-urlencoded',
            Authorization: 'Bearer ' + token }
    };
    const body = { };
    return dispatch => {
        return axios.patch(apiURL + userURL + "?firstname="+ firstname, body, header_auth)
            .then(res => dispatch(receiveProfile(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function modifyLastname(token, lastname) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/xxx-form-urlencoded',
            Authorization: 'Bearer ' + token }
    };
    const body = { };
    return dispatch => {
        return axios.patch(apiURL + userURL + "?lastname="+ lastname, body, header_auth)
            .then(res => dispatch(receiveProfile(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function createArtWork(file, token, name, price, ref, state) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token }
    };
    const body = {
        name: name,
        price: price,
        ref: ref,
        state: state
    };
    return dispatch => {
        return axios.post(apiURL + artWorkURL, body, header_auth)
            .then(res => dispatch(receiveArtWorkCreate(res, file, token)))
            .then(res => dispatch(uploadImage(token, file, res)))
            .then(dispatch(fetchArtWorks(token)))
            .catch(error => dispatch(receiveError(error)));
    }
}

function uploadImage(token, file, res) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token }
    };
    let form = new FormData();
    form.append("images[]", file);
    let url = artWorkURL + '/' +  res['id']+ '/image';
    return dispatch => {
        return axios.post(apiURL + url, form, header_auth)
            .then(res => dispatch(receiveAddImage(res)))
            .catch(error => dispatch(receiveError(error)));
    }
}

function modifyArtWork(token, name, ref, state, price, id) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + token }
    };

    const body = { };

    return dispatch => {
        return axios.patch(apiURL + artWorkURL + '/' + id + '?name=' + name
            + '&state=' + state + '&ref=' + ref + '&price=' + price, body, header_auth)
            .then(res => dispatch(receiveArtworks(res)))
            .catch(error => dispatch(receiveError(error)));
    }
}

function fetchArtWork(token, id) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token }
    };

    return dispatch => {

        return axios.get(apiURL + artWorkURL + '/' + id, header_auth)
            .then(res => dispatch(receiveArtwork(res)))
            .catch(error => dispatch(receiveError(error)));
    }
}

function fetchArtWorksByState(token, state) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token }
    };

    state = '?state=' + state;
    return dispatch => {
        return axios.get(apiURL + artWorkURL + state, header_auth)
            .then(res => dispatch(receiveArtworks(res)))
            .catch(error => dispatch(receiveError(error)));
    }
}

function fetchArtWorks(token, name) {
    const header_auth = {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token }
    };

    if (name == null)
        name = '/';
    else
        name = '?name=' + name;
    return dispatch => {

        return axios.get(apiURL + artWorkURL + name, header_auth)
            .then(res => dispatch(receiveArtworks(res, name)))
            .catch(error => dispatch(receiveError(error)));
    }
}

function shouldFetchApi(state) {
    const isFetching = state.isFetching;

    return !isFetching;
}

export function createArtworkIfNeeded(file, token, name, price, ref, state) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());
        return dispatch(createArtWork(file, token, name, price, ref, state))
    }
}

export function uploadImageIfNeeded(file, token, id) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

        return dispatch(uploadImage(file, token, id))
    }
}

export function sortByState(token, state) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

        return dispatch(fetchArtWorksByState(token, state))
    }
}

export function getArtWorksIfNeeded(token, name) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

        return dispatch(fetchArtWorks(token, name))
    }
}

export function getArtWorkIfNeeded(token, id) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

        return dispatch(fetchArtWork(token, id))
    }
}

export function signInIfNeeded(username, password) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

            return dispatch(fetchSignIn(username, password))
    }
}

export function signUpIfNeeded(username, firstname, lastname, mail, password) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

        return dispatch(fetchSignUp(username, firstname, lastname, mail, password))
    }
}

export function forgotPwd(mail) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

        return dispatch(fetchForgot(mail))
    }
}

export function getProfileIfNeeded(token) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());
        return dispatch(fetchProfile(token))
    }
}

export function modifyMailIfNeeded(token, mail) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState()))
      dispatch(requestApi());
    return dispatch(modifyMail(token, mail))
  }
}

export function modifyArtWorkIfNeeded(token, title, ref, state, price, id) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());
        return dispatch(modifyArtWork(token, title, ref, state, price, id));
    }
}

export function modifyPasswordIfNeeded(token, password) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState()))
      dispatch(requestApi());
    return dispatch(modifyPassword(token, password))
  }
}

export function modifyFirstnameIfNeeded(token, firstname) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());
        return dispatch(modifyFirstname(token, firstname))
    }
}

export function modifyLastnameIfNeeded(token, lastname) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());
        return dispatch(modifyLastname(token, lastname))
    }
}

export function eraseArtworkIfNeeded(token, id) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState()))
      dispatch(requestApi());
    return dispatch(eraseArtwork(token, id));
  }
}

export const addBilling = billing => ({
    type: ADD_BILLING,
    billing: billing
})

export const deleteBilling = id => ({
    type: DELETE_BILLING,
    id: id
})

export const setCurrentBilling = id => ({
    type: SET_CURRENT_BILLING,
    id: id
})
