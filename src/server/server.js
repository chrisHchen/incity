import express from 'express'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
import packagejson from '../../package.json'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { fetchComponentDataBeforeRender } from '../common/api/fetchComponentDataBeforeRender'
import createStore from '../client/store/createStore'
//import routes from './serverRoutes'
import createRoutes from '../client/routes'

const app = express()
const renderFullPage = (html, initialState) => {
  const publicPath = process.env.NODE_ENV !== 'production' ? '//localhost:' : ''
  const port = process.env.PORT || 3000
  const assetPath = publicPath + port
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>incity</title>
        <link rel="stylesheet" type="text/css" href="${assetPath}/assets/incity.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="${assetPath}/assets/incity.js"></script>
      </body>
    </html>
  `
}

if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}else{
  app.use('/assets', express.static(__dirname + '/assets'));
}

app.get('/*', function (req, res) {
  
  const store = createStore({}, browserHistory);
  
  match({ routes:createRoutes(store), location: req.originalUrl }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    const InitialView = (
      <Provider store={store}>
          <RouterContext {...renderProps} />
      </Provider>
    );

    //This method waits for all render component promises to resolve before returning to browser
    fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
      .then(html => {
        const componentHTML = renderToString(InitialView);
        const initialState = store.getState();
        res.status(200).end(renderFullPage(componentHTML,initialState))
      })
      .catch(err => {
        console.log(err)
        res.end(renderFullPage("",{}))
      })
  })
})

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('incity app listening at http://%s:%s', host, port);
})