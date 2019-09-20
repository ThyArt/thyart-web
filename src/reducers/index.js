import { combineReducers } from 'redux';
import artworks from './artworks';
import authentication from './authentication';
import profile from './profile';
import billings from './billings';
import customers from './customers';
import members from './members';
import newsletters from "./newsletters";

export default combineReducers({
  artworks,
  authentication,
  profile,
  billings,
  customers,
  members,
  newsletters
});
