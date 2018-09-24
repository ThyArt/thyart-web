
import {
    RECEIVE_SIGN_IN,
    RECEIVE_SIGN_UP,
    RECEIVE_ERROR,
REQUEST_API} from "../actions/actions";

const thyartApp = (state = {
                        isLogged: false,
                        isFetching: false,
                        token: null,
                        msg: null,
                        error: null
                   },
                   action) => {
    switch (action.type) {
        case REQUEST_API:
            return Object.assign({}, state, {
              isFetching: true
            });
        case RECEIVE_SIGN_IN:
            return Object.assign({}, state, {
                isFetching: false,
                isLogged: true,
                token: action.token,
                msg: action.msg
            });
        case RECEIVE_SIGN_UP:
            return Object.assign({}, state, {
                isFetching: false,
                msg: action.msg
            });
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state

    }
}

export default thyartApp