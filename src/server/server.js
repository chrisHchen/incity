import 'babel-polyfill';
import express from 'express'
import serveStatic from 'serve-static'
import bodyParser from 'body-parser'
import logger from 'morgan'
import compression from 'compression'
import mongoose from './dbconnect'
import session from 'express-session'
import path from 'path'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express()
const port = process.PORT || 3000
const isDeveloping = process.env.NODE_ENV == 'development'
const mongoStore = require('connect-mongo')(session)

if( isDeveloping ){
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')('gf'));


app.use( session({
  secret:'gf',
  // save session even unmodified 
  resave:true,
  // don't create session until something stored 
  saveUninitialized:true, 
  //为true时connect.sid的过期时间每次请求都会更新
  rolling:true,
  //30天过期
  cookie: { 
    maxAge:1000*60*60*24*30
  },
  store:new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))


if( isDeveloping ){
  const compiler = webpack(webpackConfig);
  app.use( webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }) );
  app.use( webpackHotMiddleware(compiler) );
}else{
  app.use( serveStatic(path.join(__dirname, 'assets')) );
}

//import router
require('./config/router')(app)

const server = app.listen( port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('incity app listening at http://%s:%s', host, port);
})