import {
  DISCONNECT,
  RECEIVE_PWD,
  RECEIVE_SIGN_IN,
  RECEIVE_SIGN_UP,
  REQUEST_AUTH,
  RECEIVE_AUTH_ERROR
} from "../constants/constantsAction";

const initialState = {
  isLogged: false,
  isFetching: false,
  msg: null,
  error: null
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null
      });
    case RECEIVE_AUTH_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_SIGN_IN:
      return Object.assign({}, state, {
        isFetching: false,
        isLogged: true,
        msg: action.msg,
        error: null
      });
    case RECEIVE_SIGN_UP:
      return Object.assign({}, state, {
        isFetching: false,
        msg: action.msg,
        error: null
      });
    case RECEIVE_PWD:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        msg: action.msg
      });
    case DISCONNECT:
      return Object.assign({}, state, {
        isLogged: false
      });
    default:
      return state;

  }
}

export default authentication;