import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import makeRootReducer from './reducers'

export default (initialState = {}, history) => {
  //https://github.com/reactjs/react-router-redux
  //at:What if I want to issue navigation events via Redux actions?
  const middleware = [thunk, routerMiddleware(history)]
  const enhancers = []

  if (process.env.NODE_ENV !== 'production' && process.browser) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
    middleware.push(createLogger())
    enhancers.push(  DevTools.instrument() )
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}