import { combineReducers } from 'redux'
import artworks from './artworks'
import authentication from './authentication'
import profile from './profile'
import billings from "./billings";

export default combineReducers({
  artworks,
  authentication,
  profile,
  billings
})