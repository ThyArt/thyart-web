import {
  RECEIVE_ADDIMAGE,
  RECEIVE_ARTWORK,
  RECEIVE_ARTWORKCREATE,
  RECEIVE_ARTWORKS,
  RECEIVE_ARTWORKS_ERROR,
  //RECEIVE_ARTWORKS_MODIFY,
  REQUEST_ARTWORKS, SORT_ARTWORKS
} from "../constants/constantsAction";
import { cloneDeep } from "lodash";

const initialState = {
  isFetching: false,
  msg: null,
  error: null,
  artworks: [],
  artwork: null,
  artistId: null
};

function artworks(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTWORKS:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null,
        artwork: null

      });
    case RECEIVE_ARTWORKS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_ARTWORKS:
      return Object.assign({}, state, {
        isFetching: false,
        artworks: action.artworks,
        error: null,
        msg: action.msg
      });
    case RECEIVE_ARTWORK:
      return Object.assign({}, state, {
        isFetching: false,
        artwork: action.artwork,
        error: null,
        msg: action.msg
      });
    case RECEIVE_ARTWORKCREATE:
      return Object.assign({}, state, {
        isFetching: false,
        artistId: action.id,
        error: null,
        msg: action.msg
      });
    case RECEIVE_ADDIMAGE:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        msg: null
      });
    case SORT_ARTWORKS:
      let artworks = cloneDeep(state.artworks);
      switch (action.sortType) {
        case "nameA":
          artworks.sort(function(a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case "nameZ":
          artworks.sort(function(a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
          });
          artworks.reverse();
          break;
        case "priceInc":
          artworks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "priceDec":
          artworks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
      }
      return Object.assign({}, state, {
        artworks: artworks
      });
    default:
      return state;
  }
}

export default artworks;
