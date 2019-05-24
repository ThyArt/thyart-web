import {
  REQUEST_CUSTOMERS,
  RECEIVE_CUSTOMERS_ERROR,
  RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMER,
  OPEN_CREATE_CUSTOMER, SORT_BILLINGS, SORT_CUSTOMERS
} from "../constants/constantsAction";
import { cloneDeep } from "lodash";

const initialState = {
    isFetching: false,
    msg: null,
    error: null,
    customers: [],
    customer: null,
    modif: false,
    table: true
  };

function customers (state = initialState, action)
{
  switch (action.type) {

    case REQUEST_CUSTOMERS:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null
      });
    case RECEIVE_CUSTOMERS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_CUSTOMERS:
      return Object.assign({}, state, {
        isFetching: false,
        customers: action.customers,
        error: null,
        modif: false,
        table: true
      });
    case RECEIVE_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.customer,
        error: null,
        table: false,
        modif: false
      });
    case OPEN_CREATE_CUSTOMER:
      return Object.assign({}, state, {
        error: null,
        modif: true,
        table: false,
        customer: null
      });
    case SORT_CUSTOMERS:
      let table = cloneDeep(state.customers);
      switch(action.sortType)
      {
        case 'firstNameA':
          table.sort(function(a, b)
          {
            a = a.first_name;
            b = b.first_name;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case 'firstNameZ':
          table.sort(function(a, b)
          {
            a = a.first_name;
            b = b.first_name;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'lastNameA':
          table.sort(function(a, b)
          {
            a = a.last_name;
            b = b.last_name;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case 'lastNameZ':
          table.sort(function(a, b)
          {
            a = a.last_name;
            b = b.last_name;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'mailZ':
          table.sort(function(a, b)
          {
            a = a.email;
            b = b.email;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'mailA':
          table.sort(function(a, b)
          {
            a = a.email;
            b = b.email;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        default:
          break;
      }
      return Object.assign({}, state, {
        customers: table
      });

    default:
      return state

  }
}

export default customers;