import { combineReducers } from 'redux'
import artworks from './artworks'
import authentication from './authentication'
import profile from './profile'

export default combineReducers({
  artworks,
  authentication,
  profile
})