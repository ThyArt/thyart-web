import {
    REQUEST_NEWSLETTERS,
    RECEIVE_NEWSLETTERS_ERROR,
    RECEIVE_NEWSLETTERS,
    RECEIVE_NEWSLETTER,
    OPEN_CREATE_NEWSLETTER,
    SORT_NEWSLETTERS, REQUEST_CUSTOMERS, RECEIVE_CUSTOMERS,
} from "../constants/constantsAction";
import { cloneDeep } from "lodash";

const initialState = {
    isFetching: false,
    msg: null,
    error: null,
    newsletters: [],
    newsletter: null,
    newObj: false,
    table: true,
    customers: [],
    isCustomersFetching: false,
    modif: false
};

function newsletters(state = initialState, action) {
    switch (action.type) {
        case REQUEST_NEWSLETTERS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                msg: null
            });
        case RECEIVE_NEWSLETTERS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                msg: null
            });
        case REQUEST_CUSTOMERS:
            return Object.assign({}, state, {
                isCustomersFetching: true,
                error: null,
                msg: null
            });
        case RECEIVE_CUSTOMERS:
            return Object.assign({}, state, {
                isCustomersFetching: false,
                customers: action.customers,
                error: null
            });
        case RECEIVE_NEWSLETTERS:
            return Object.assign({}, state, {
                isFetching: false,
                newsletters: action.newsletters,
                error: null,
                modif: false,
                newObj: false,
                table: true
            });
        case RECEIVE_NEWSLETTER:
            return Object.assign({}, state, {
                isFetching: false,
                newsletter: action.newsletter,
                error: null,
                table: false,
                modif: false,
                newObj: false
            });
        case OPEN_CREATE_NEWSLETTER:
            return Object.assign({}, state, {
                error: null,
                modif: true,
                newObj: true,
                table: false,
                newsletter: null
            });
        case SORT_NEWSLETTERS:
            let table = cloneDeep(state.customers);
            switch (action.sortType) {
                case "firstNameA":
                    table.sort(function(a, b) {
                        a = a.first_name.toLowerCase();
                        b = b.first_name.toLowerCase();

                        return a < b ? -1 : a > b ? 1 : 0;
                    });
                    break;
                case "firstNameZ":
                    table.sort(function(a, b) {
                        a = a.first_name.toLowerCase();
                        b = b.first_name.toLowerCase();

                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                    break;
                case "lastNameA":
                    table.sort(function(a, b) {
                        a = a.last_name.toLowerCase();
                        b = b.last_name.toLowerCase();

                        return a < b ? -1 : a > b ? 1 : 0;
                    });
                    break;
                case "lastNameZ":
                    table.sort(function(a, b) {
                        a = a.last_name.toLowerCase();
                        b = b.last_name.toLowerCase();

                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                    break;
                case "mailZ":
                    table.sort(function(a, b) {
                        a = a.email.toLowerCase();
                        b = b.email.toLowerCase();

                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                    break;
                case "mailA":
                    table.sort(function(a, b) {
                        a = a.email.toLowerCase();
                        b = b.email.toLowerCase();

                        return a < b ? -1 : a > b ? 1 : 0;
                    });
                    break;
                default:
                    break;
            }
            return Object.assign({}, state, {
                newsletters: table
            });

        default:
            return state;

    }
}

export default newsletters;