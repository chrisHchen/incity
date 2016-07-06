import { GET_REG_VALUE, TOAST_SHOW, TOAST_HIDE} from '../constants'
import Immutable from 'immutable'

export default function register( state = Immutable.fromJS({}), action ) {
	switch (action.type) {
		case GET_REG_VALUE:
			return state.set(action.key, action[action.key])
		case TOAST_SHOW:
			return state.set('toastDesc', action.payload.toastDesc)
									.set('toastShow', action.payload.toastShow)
		case TOAST_HIDE:
			return state.set('toastShow', action.payload.toastShow)
		default : 
			return state
	}
}

