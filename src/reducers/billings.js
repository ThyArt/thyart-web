import {
  REQUEST_BILLINGS,
  RECEIVE_BILLINGS_ERROR,
  RECEIVE_BILLINGS,
  RECEIVE_BILLING,
  OPEN_CREATE_BILLING,
  SORT_BILLINGS,
  REQUEST_ARTWORKS,
  REQUEST_CUSTOMERS,
  RECEIVE_ARTWORKS,
  RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMERS_ERROR,
  RECEIVE_ARTWORKS_ERROR
} from "../constants/constantsAction";
import { cloneDeep } from "lodash";

const initialState = {
  isFetching: false,
  isArtworksFetching: false,
  isCustomersFetching: false,
  msg: null,
  error: null,
  billings: [],
  artworks: [],
  customers: [],
  billing: null,
  modif: false,
  table: true
};

function billings (state = initialState, action)
{
  switch (action.type) {

    case REQUEST_BILLINGS:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null
      });
    case REQUEST_ARTWORKS:
      return Object.assign({}, state, {
        isArtworksFetching: true,
        error: null,
        msg: null
      });
    case REQUEST_CUSTOMERS:
      return Object.assign({}, state, {
        isCustomersFetching: true,
        error: null,
        msg: null
      });
    case RECEIVE_BILLINGS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_CUSTOMERS_ERROR:
      return Object.assign({}, state, {
        isFetchingCustomers: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_ARTWORKS_ERROR:
      return Object.assign({}, state, {
        isFetchingArtworks: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_BILLINGS:
      return Object.assign({}, state, {
        isFetching: false,
        billings: action.billings,
        error: null,
        modif: false,
        table: true
      });
    case RECEIVE_ARTWORKS:
      return Object.assign({}, state, {
        isArtworksFetching: false,
        artworks: action.artworks,
        error: null,
      });
    case RECEIVE_CUSTOMERS:
      return Object.assign({}, state, {
        isCustomersFetching: false,
        customers: action.customers,
        error: null,
      });
    case RECEIVE_BILLING:
      return Object.assign({}, state, {
        isFetching: false,
        billing: action.billing,
        error: null,
        table: false,
        modif: false
      });
    case OPEN_CREATE_BILLING:
      return Object.assign({}, state, {
        error: null,
        modif: true,
        table: false,
        billing: null
      });
    case SORT_BILLINGS:
      let table = cloneDeep(state.billings);
      switch(action.sortType)
      {
        case 'nameA':
          table.sort(function(a, b)
          {
            a = a.name;
            b = b.name;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case 'nameZ':
          table.sort(function(a, b)
          {
            a = a.name;
            b = b.name;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'artworkA':
          table.sort(function(a, b)
          {
            a = a.artworkName;
            b = b.artworkName;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case 'artworkZ':
          table.sort(function(a, b)
          {
            a = a.artworkName;
            b = b.artworkName;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'dateNew':
          table.sort(function(a, b)
          {
            a = a.date;
            b = b.date;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'dateOld':
          table.sort(function(a, b)
          {
            a = a.date;
            b = b.date;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        default:
          break;
      }
      return Object.assign({}, state, {
        billings: table
      });

    default:
      return state
  }
}

export default billings