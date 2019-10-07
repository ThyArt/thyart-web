import {
  REQUEST_MEMBERS,
  RECEIVE_MEMBERS_ERROR,
  RECEIVE_MEMBERS, RECEIVE_PERMISSIONS
} from "../constants/constantsAction";

const initialState = {
  isFetching: false,
  msg: null,
  error: null,
  members: [],
  canAdd: false,
  canModify: false
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
    case RECEIVE_PERMISSIONS:
      let canAdd = (action.permissions.find( permission => permission.id === 1) !== undefined);
      let canModify = (action.permissions.find( permission => permission.id === 2) !== undefined);

      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        canAdd: canAdd,
        canModify: canModify,
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
