
import {
    RECEIVE_SIGN_IN,
    RECEIVE_SIGN_UP,
    RECEIVE_ERROR,
    REQUEST_API,
    DISCONNECT,
    RECEIVE_PWD,
    RECEIVE_PROFILE, RECEIVE_ARTWORKCREATE, RECEIVE_ADDIMAGE
} from "../actions/actions";

const thyartApp = (state = {
                        isLogged: false,
                        isFetching: false,
                        token: null,
                        msg: null,
                        error: null,
                        mail: null
                   },
                   action) => {
    switch (action.type) {
        case REQUEST_API:
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                msg: null
            });
        case RECEIVE_SIGN_IN:
            return Object.assign({}, state, {
                isFetching: false,
                isLogged: true,
                token: action.token,
                msg: action.msg,
                error: null
            });
        case RECEIVE_SIGN_UP:
            return Object.assign({}, state, {
                isFetching: false,
                msg: action.msg,
                error: null
            });
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                msg: null
            });
        case RECEIVE_PROFILE:
            return Object.assign({}, state, {
                isFetching: false,
                mail: action.mail
            });
        case RECEIVE_PWD:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                msg: action.msg
            });
        case RECEIVE_ARTWORKCREATE:
            return Object.assign({}, state,{
                isFetching: false,
                error:null,
                msg: action.msg
        });
        case RECEIVE_ADDIMAGE:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                msg: action.msg
            });
        case DISCONNECT:
            return Object.assign({}, state, {
                isLogged: false,
                token: null
            });
        default:
            return state

    }
}

export default thyartApp