import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import './components/Header/Header.scss'


const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routing
})

if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
// if (__DEVELOPMENT__ && module.hot) {
//   const renderApp = render
//   const renderError = (error) => {
//     const RedBox = require('redbox-react')
//     ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
//   }
//   render = () => {
//     try {
//       renderApp(Math.random())
//     } catch (error) {
//       renderError(error)
//     }
//   }
//   module.hot.accept(['./routes/index'], () => render())
// }

render()

if (process.env.NODE_ENV !== 'production') {
  const showDevTools = require('./showDevTools').default;
  showDevTools(store);
}