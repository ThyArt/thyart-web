import {
  RECEIVE_ADDIMAGE,
  RECEIVE_ARTWORK,
  RECEIVE_ARTWORKCREATE,
  RECEIVE_ARTWORKS,
  RECEIVE_ARTWORKS_ERROR,
  REQUEST_ARTWORKS
} from "../constants/constantsAction";

const initialState = [
  {
    isFetching: false,
    msg: null,
    error: null,
    artworks: [],
    artwork: null,
    artistId: null
  }
];

function artworks (state = initialState, action)
{
  switch (action.type) {

    case REQUEST_ARTWORKS:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null
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
        error: null
      });
    case RECEIVE_ARTWORK:
      return Object.assign({}, state, {
        isFetching: false,
        artwork: action.artwork,
        error: null
      });
    case RECEIVE_ARTWORKCREATE:
      return Object.assign({}, state,{
        isFetching: false,
        artistId: action.id,
        error: null
      });
    case RECEIVE_ADDIMAGE:
      return Object.assign({}, state, {
        isFetching: false,
        error: null
      });
    default:
      return state

  }
}

export default artworks;