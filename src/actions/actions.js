import axios from "axios/index";

export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN';
export const RECEIVE_SIGN_UP = 'RECEIVE_SIGN_UP';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const REQUEST_API = 'REQUEST_API';
export const DISCONNECT = 'DISCONNECT';
export const RECEIVE_PWD = 'RECEIVE_PWD';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_ARTWORKCREATE = 'RECEIVE_ARTWORKCREATE';
export const RECEIVE_ADDIMAGE = 'RECEIVE_ADDIMAGE';

const apiURL = 'http://thyart-api-dev.eu-west-1.elasticbeanstalk.com/';
const apiURLocal = 'http://localhost:80/';
const userURL = 'api/user';
const tokenURL = 'oauth/token';
const pwdURL = 'api/password/create';
const profileURL = 'api/user/self';
const artWorkURL = 'api/artwork';

const header = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
};
const clientID = 2;
const clientSecret = 'BzqoGU5N3Ue6Dsm6cSQ81SdQsY3e0B8gicbdk3dI';

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
        msg: "Congratulation email sent successfully",
    }
}

function receiveProfile(res) {
    return  {
        type: RECEIVE_PROFILE,
        mail: res.data['data']['email']
    }
}

function receiveArtWorkCreate(res, file, token) {
    //dispatch(uploadImage(token, file, res.data['data']['id'].toString(10)));
    return {
        type: RECEIVE_ARTWORKCREATE,
        msg: res.data['data']['id'].toString(10)
    }
}

function receiveAddImage(res) {
    console.log('tamere');
    return {
        type: RECEIVE_ADDIMAGE,
        msg: 'Image uploaded with success.'
    }
}

function receiveError(error) {
console.log(error);
    let error_msg;
    if (
        error.response &&
        error.response.data &&
        error.response.data.messages
    )
        error_msg = error.response.data.messages[0];
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

        return axios.post(apiURLocal + tokenURL, body, header)
            .then(res => dispatch(receiveSignIn(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function fetchSignUp(username, mail, password) {

    const body = {
        name: username,
        email: mail,
        password: password
    };
    return dispatch => {
        return axios.post(apiURLocal + userURL, body, header)
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
        return axios.post(apiURLocal + pwdURL, body, header)
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
        return axios.get(apiURLocal + profileURL, header_auth)
            .then(res => dispatch(receiveProfile(res)))
            .catch(error => dispatch(receiveError(error)))
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
    return axios.patch(apiURLocal + userURL + "?email="+mail, body, header_auth)
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
    return axios.patch(apiURLocal + userURL + "?password="+ password, body, header_auth)
      .then(res => dispatch(receiveProfile(res)))
      .catch(error => dispatch(receiveError(error)))
  }
}

function modifyUsername(token, username) {
  const header_auth = {
    headers: { Accept: 'application/json',
      'Content-Type': 'application/xxx-form-urlencoded',
      Authorization: 'Bearer ' + token }
  };
  const body = { };
  return dispatch => {
    return axios.patch(apiURLocal + userURL, body, header_auth)
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
        return axios.post(apiURLocal + artWorkURL, body, header_auth)
            .then(res => dispatch(receiveArtWorkCreate(res, file, token)))
            .then(res => dispatch(uploadImage(token, file, res)))
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
    let url = artWorkURL + '/' +  res['msg']+ '/image';
    return dispatch => {
        return axios.post(apiURLocal + url, form, header_auth)
            .then(res => dispatch(receiveAddImage(res)))
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

export function signInIfNeeded(username, password) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

            return dispatch(fetchSignIn(username, password))
    }
}

export function signUpIfNeeded(username, mail, password) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            dispatch(requestApi());

            return dispatch(fetchSignUp(username, mail, password))
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

export function modifyPasswordIfNeeded(token, password) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState()))
      dispatch(requestApi());
    return dispatch(modifyPassword(token, password))
  }
}

export function modifyUsernameIfNeeded(token, username) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState()))
      dispatch(requestApi());
    return dispatch(modifyUsername(token, username))
  }
}