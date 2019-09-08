import {
  REQUEST_MEMBERS,
  RECEIVE_MEMBERS_ERROR,
  RECEIVE_MEMBERS
} from "../constants/constantsAction";
import { cloneDeep } from "lodash";

const initialState = {
  isFetching: false,
  msg: null,
  error: null,
  members: [],
};

function members(state = initialState, action) {
  switch (action.type) {
  case REQUEST_MEMBERS:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null
      });
    case RECEIVE_MEMBERS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_MEMBERS:
      return Object.assign({}, state, {
        isFetching: false,
        members: action.members,
        error: null
      });
    default:
      return state;
  }
}

export default members;
