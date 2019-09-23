import {
  REQUEST_BILLINGS,
  RECEIVE_BILLINGS_ERROR,
  RECEIVE_BILLINGS,
  RECEIVE_BILLING,
  OPEN_CREATE_BILLING,
  SORT_BILLINGS,
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  RECEIVE_ARTWORKS_ERROR,
  OPEN_MODIFY_BILLING, RECEIVE_BILLINGS_ARTWORKS, RECEIVE_BILLINGS_CUSTOMERS
} from '../constants/constantsAction';
import { cloneDeep } from 'lodash';

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
  newObj: false,
  table: true
};

function billings(state = initialState, action) {
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
    case RECEIVE_BILLINGS_ARTWORKS:
      return Object.assign({}, state, {
        artworks: action.artworks
      });
    case RECEIVE_BILLINGS_CUSTOMERS:
      return Object.assign({}, state, {
        customers: action.customers
      });
    case RECEIVE_BILLINGS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
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
        newObj: false,
        table: true
      });
    case RECEIVE_ARTWORKS:
      return Object.assign({}, state, {
        isArtworksFetching: false,
        artworks: action.artworks,
        error: null
      });
    case RECEIVE_BILLING:
      return Object.assign({}, state, {
        isFetching: false,
        billing: action.billing,
        error: null,
        table: false,
        modif: false,
        newObj: false
      });
    case OPEN_CREATE_BILLING:
      return Object.assign({}, state, {
        error: null,
        newObj: true,
        modif: true,
        table: false,
        billing: null
      });
    case OPEN_MODIFY_BILLING:
      return Object.assign({}, state, {
        error: null,
        newObj: false,
        modif: true
      });
    case SORT_BILLINGS:
      let table = cloneDeep(state.billings);
      switch (action.sortType) {
        case "nameA":
          table.sort(function(a, b) {
            a = a.customer.toLowerCase();
            b = b.customer.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case "nameZ":
          table.sort(function(a, b) {
            a = a.customer.toLowerCase();
            b = b.customer.toLowerCase();

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case "artworkA":
          table.sort(function(a, b) {
            a = a.artwork.toLowerCase();
            b = b.artwork.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case "artworkZ":
          table.sort(function(a, b) {
            a = a.artwork.toLowerCase();
            b = b.artwork.toLowerCase();

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case "dateNew":
          table.sort(function(a, b) {
            a = a.date;
            b = b.date;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case "dateOld":
          table.sort(function(a, b) {
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
      return state;
  }
}

export default billings;