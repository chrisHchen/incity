import 'babel-polyfill'
import { trigger } from 'redial'
import React from 'react'
import ReactDOM from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import { Provider } from 'react-redux';

import './components/Header/Header.scss'

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState, browserHistory)
const { dispatch } = store;
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routing
})
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const MOUNT_NODE = document.getElementById('root')

if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

let render = () => {
  // We need to have a root route for HMR to work.
  const routes = require('./routes/index').default(store)

  // Pull child routes using match. Adjust Router for vanilla webpack HMR,
  // in development using a new key every time there is an edit.
  match({ routes, location }, () => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `routes.` Normally, we would want just one file from which we require `routes` from.
    ReactDOM.render(
      <Provider store={store}>
          <Router routes={routes} history={history} key={Math.random()}/>
      </Provider>,
      MOUNT_NODE
    )
  })

  browserHistory.listen(location => {
    // Match routes based on location object:
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      // Get array of route handler components:
      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,

          // Allow lifecycle hooks to dispatch Redux actions:
          dispatch,
        };

      // Don't fetch data for initial route, server has already done the work:
      if (window.INITIAL_STATE) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.INITIAL_STATE;
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals);
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals);
    });
  });
}

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    setTimeout(render);
  });
}

render()

if (__DEVTOOLS__) {
  const showDevTools = require('./showDevTools').default;
  showDevTools(store);
}