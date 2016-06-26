import { injectReducer } from '../../store/makeRootReducer'
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: 'login',
  getComponents( nextState, cb ) {
      require.ensure([], ( require ) => {
        const Login = require('./containers/LoginBox').default
        const reducer = require('./reducer').default
        injectReducer(store, { key: 'login', reducer })
        cb( null, Login )
      }, 'login')
    }
})
