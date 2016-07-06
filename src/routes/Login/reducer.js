import { GET_LOGIN_VALUE, TOAST_SHOW, TOAST_HIDE} from '../constants'
import Immutable, { fromJS } from 'immutable'

export default function login( state = Immutable.fromJS({}), action ) {
	//console.log(state)
	switch (action.type) {
		case GET_LOGIN_VALUE:
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

