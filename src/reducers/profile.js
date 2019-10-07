import {
  RECEIVE_PROFILE,
  REQUEST_PROFILE,
  RECEIVE_PROFILE_ERROR,
  RECEIVE_PERMISSIONS
} from '../constants/constantsAction';

export const initialState = {
  isFetching: false,
  msg: null,
  error: null,
  mail: null,
  name: null,
  firstname: null,
  lastname: null,
  role: null,
  permissions: []
};

function profile(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        msg: null
      });
    case RECEIVE_PROFILE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        msg: null
      });
    case RECEIVE_PERMISSIONS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        permissions: action.permissions
      });
    case RECEIVE_PROFILE:
      let role;

      switch (action.role) {
        case 'gallerist':
          role = 'Galeriste';
          break;
        case 'member':
          role = 'Membre de la galerie';
          break;
        case 'admin':
          role = 'Administrateur';
          break;
        default:
          role = action.role;
          break;
      }

      return Object.assign({}, state, {
        isFetching: false,
        mail: action.mail,
        firstname: action.firstname,
        lastname: action.lastname,
        msg: action.msg,
        role: role
      });
    default:
      return state;
  }
}

export default profile;
