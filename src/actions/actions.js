import axios from "axios/index";

export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN'
export const RECEIVE_SIGN_UP = 'RECEIVE_SIGN_UP'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const REQUEST_API = 'REQUEST_API'
export const DISCONNECT = 'DISCONNECT'

const apiURL = 'http://thyart-api-dev.eu-west-1.elasticbeanstalk.com/';
const userURL = 'api/user';
const tokenURL = 'oauth/token';

const header = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
};
const clientID = 1;
const clientSecret = 'fbpB6Lmd3lcDDFKZF5VwJib2jjphjweU67YiA2NE';

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
        msg: res.data,
        token: res.data['access_token'],

    }
}

function receiveSignUp(res) {
    return {
        type: RECEIVE_SIGN_UP,
        msg: res.data,
    }
}

function receiveError(error) {

    var error_msg;
    if (
        error.response &&
        error.response.data &&
        error.response.data.messages
    )
        error_msg = 'error: ' + error.response.data.messages[0];
    else
        error_msg = 'Unknown error.';

    return {
        type: RECEIVE_ERROR,
        error: error_msg
    }
}

function fetchSignIn(username, password) {
    return dispatch => {
        dispatch(requestApi)
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

function fetchSignUp(username, mail, password) {

    const body = {
        name: username,
        email: mail,
        password: password
    };
    return dispatch => {
        dispatch(requestApi)
        return axios.post(apiURL + userURL, body, header)
            .then(res => dispatch(receiveSignUp(res)))
            .catch(error => dispatch(receiveError(error)))
    }
}

function shouldFetchApi(state) {
    const isFetching = state.isFetching;

    if (isFetching)
        return true
    else
        return false
}

export function signInIfNeeded(username, password) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            return dispatch(fetchSignIn(username, password))
    }
}

export function signUpIfNeeded(username, mail, password) {
    return (dispatch, getState) => {
        if (shouldFetchApi(getState()))
            return dispatch(fetchSignUp(username, mail, password))
    }
}