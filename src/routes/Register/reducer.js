import { GET_REG_VALUE, GET_LOGIN_INITSTATE} from '../constants'
import Immutable from 'immutable'

export default function register( state = Immutable.fromJS({}), action ) {
	switch (action.type) {
		case GET_LOGIN_INITSTATE:
			return Immutable.fromJS(action.payload)
		case GET_REG_VALUE:
			return state.setIn([action.key, 'value'], action[action.key])
		default : 
			return state
	}
}

