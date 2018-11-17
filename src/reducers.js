import { combineReducers } from 'redux'
import userReducer from './User/reducer.js'
import projectReducer from './Project/reducer.js'
import requestReducer from './requestReducer.js'

export default combineReducers({
  userReducer,
  projectReducer,
  requestReducer
})
