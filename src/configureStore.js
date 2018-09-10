import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import reducers from './reducers'

function configureStore (reducers) {
  const enhancer = compose(
    applyMiddleware(promiseMiddleware(), thunk, logger)
  )

  return createStore(reducers, enhancer)
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducers)

var store = configureStore(persistedReducer)
var persistor = persistStore(store)

export { store, persistor }
