import { combineReducers } from 'redux'
import userReducer from './User/reducer.js'
import projectReducer from './Project/reducer.js'
import loadingReducer from './loadingReducer.js'
import errorReducer from './errorReducer.js'

export default combineReducers({
  userReducer,
  projectReducer,
  loadingReducer,
  errorReducer
})
