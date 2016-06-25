import { injectReducer } from '../../store/makeRootReducer'
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: 'register',
  getComponents(nextState, cb) {
      require.ensure([], (require) => {
        const Register = require('./containers/RegisterBox').default
        const reducer = require('./reducer').default
        injectReducer(store, { key: 'register', reducer })
        cb(null, Register)
      }, 'register')
    }
})
