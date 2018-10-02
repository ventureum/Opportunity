import { combineReducers } from 'redux'
import userReducer from './User/reducer.js'
import projectReducer from './Project/reducer.js'

export default combineReducers({
  userReducer,
  projectReducer
})
