import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from './reducers'

function configureStore () {
  const enhancer = compose(
    applyMiddleware(promiseMiddleware(), thunk, logger)
  )

  return createStore(reducers, enhancer)
}

var store = configureStore()

export default store
