
import {
    RECEIVE_SIGN_IN,
    RECEIVE_SIGN_UP,
    RECEIVE_ERROR,
    REQUEST_API,
    DISCONNECT,
    RECEIVE_PWD,
    RECEIVE_PROFILE,
    RECEIVE_ARTWORKCREATE,
    RECEIVE_ADDIMAGE,
    RECEIVE_ARTWORKS,
    RECEIVE_ARTWORK,
    DELETE_BILLING,
    ADD_BILLING, SET_CURRENT_BILLING
} from "../actions/actions";
import { cloneDeep, findIndex } from "lodash";
import uuid from "uuid";

function thyartApp (state = {
                        isLogged: false,
                        isFetching: false,
                        token: null,
                        msg: null,
                        error: null,
                        mail: null,
                        name: null,
                        firstname: null,
                        lastname: null,
                        artworks: [],
                        artwork: null,
                        billings: [],
                        billingTable: [],
                        currentBilling: null
                   },
                   action)
{
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
        case RECEIVE_ARTWORKS:
            return Object.assign({}, state, {
                isFetching: false,
                artworks: action.artworks,
                error: null
            });
        case RECEIVE_ARTWORK:
            return Object.assign({}, state, {
                isFetching: false,
                artwork: action.artwork,
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
                mail: action.mail,
                firstname: action.firstname,
                lastname: action.lastname
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
                error:null
        });
        case RECEIVE_ADDIMAGE:
            return Object.assign({}, state, {
                isFetching: false,
                error: null
            });
        case DISCONNECT:
            return Object.assign({}, state, {
                isLogged: false,
                token: null
            });
        case DELETE_BILLING:
            let rows = cloneDeep(state.billings);
            let rows2 = cloneDeep(state.billingTable);
            let id = action.id;
            let idx = findIndex(rows, { id });

            // this could go through flux etc.
            rows.splice(idx, 1);
            idx = findIndex(rows2, { id });
            rows2.splice(idx, 1);
            return Object.assign({}, state, {
                billings: rows,
                billingTable: rows2
            });
        case ADD_BILLING:
            rows = cloneDeep(state.billings);
            rows2 = cloneDeep(state.billingTable);
            id = uuid.v4(),

            rows.unshift({
            id: id,
            fName: action.billing.fName,
            lName: action.billing.lName,
            mail: action.billing.mail,
            address: action.billing.address,
            phone: action.billing.phone,
            artworkName: action.billing.artworkName
        });
            rows2.unshift({
                id: id,
                name: action.billing.lName,
                family: action.billing.fName,
                mail: action.billing.mail
            });

            return Object.assign({}, state, {
                billings: rows,
                billingTable: rows2
            });
        case SET_CURRENT_BILLING:
            rows = cloneDeep(state.billings);
            id = action.id;
            idx = findIndex(rows, {id});
            let currentBilling = rows[idx];
            console.log(currentBilling);
            return Object.assign({}, state, {
                currentBilling: currentBilling
            });
        default:
            return state

    }
}

export default thyartApp