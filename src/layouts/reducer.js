import { TOAST_SHOW, TOAST_HIDE} from '../routes/constants'
import Immutable from 'immutable'

export default function msg( state = Immutable.fromJS({}), action ) {
	//console.log(state)
	switch (action.type) {
		case TOAST_SHOW:
			return state.set('toastDesc', action.payload.toastDesc)
									.set('toastShow', action.payload.toastShow)
		case TOAST_HIDE:
			return state.set('toastShow', action.payload.toastShow)
		default : 
			return state
	}
}

