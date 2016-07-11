import { GET_LOGIN_VALUE, GET_LOGIN_INITSTATE} from '../constants'
import Immutable from 'immutable'

export default function login( state = Immutable.fromJS({}), action ) {
	//console.log(state)
	switch (action.type) {
		case GET_LOGIN_INITSTATE:
			return Immutable.fromJS(action.payload)
		case GET_LOGIN_VALUE:
			return state.setIn([action.key, 'value'], action[action.key])
		default : 
			return state
	}
}

