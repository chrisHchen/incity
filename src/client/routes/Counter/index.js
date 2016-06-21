import { injectReducer } from '../../store/makeRootReducer'
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponents(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
            dependencies for bundling   */
        const Counter = require('./containers/CounterContainer').default
        const reducer = require('./modules/counter').default
        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, { key: 'counter', reducer })

        /*  Return getComponent   */
        cb(null, Counter)

      /* Webpack named bundle   */
      }, 'counter')
    }
})


