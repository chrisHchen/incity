import { injectReducer } from '../../store/makeRootReducer'
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: 'create',
  getComponents( nextState, cb ) {
      require.ensure([], ( require ) => {
        const Create = require('./containers/CreateStory').default
        const reducer = require('./reducer').default
        injectReducer(store, { key: 'createPhoto', reducer })
        cb( null, Create )
      }, 'createPhoto')
    }
})
