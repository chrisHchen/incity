import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import msg from '../layouts/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
  	msg: msg,
    routing: routerReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
