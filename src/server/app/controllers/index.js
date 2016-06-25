import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, RouterContext, match, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import createRoutes from '../../../routes'
import createStore from '../../../store/createStore'

const isDeveloping = process.env.NODE_ENV == 'development'
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>incity</title>
        <link rel="stylesheet" type="text/css" href="/build/${ isDeveloping ? 'incity.css' : 'incity.min.css'}">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/build/${ isDeveloping ? 'vendor.js' : 'vendor.min.js'}"></script>
        <script src="/build/${ isDeveloping ? 'incity.js' : 'incity.min.js'}"></script>
      </body>
    </html>
  `
}

export default function index (req, res) {
  const store = createStore({}, browserHistory);
  const routes = createRoutes(store);
  const { dispatch } = store;
  const history = createMemoryHistory(req.path);
  match({ routes, history, location: req.originalUrl }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
     path: renderProps.location.pathname,
     query: renderProps.location.query,
     params: renderProps.params,

     // Allow lifecycle hooks to dispatch Redux actions:
     dispatch,
    }

    const InitialView = (
      <Provider store={store}>
          <RouterContext {...renderProps} />
      </Provider>
    );

    //https://github.com/markdalgleish/redial
    trigger('fetch', components, locals)
      .then(() => {
        const initialState = store.getState();
        const InitialView = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const html = renderToString(InitialView)
        res.status(200).send(renderFullPage(html, initialState));
      })
      .catch(e => console.log(e));
  })
}