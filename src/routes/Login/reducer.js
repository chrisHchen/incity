import { GET_LOGIN_VALUE} from '../constants'
import Immutable from 'immutable'

export default function login( state = Immutable.fromJS({}), action ) {
	//console.log(state)
	switch (action.type) {
		case GET_LOGIN_VALUE:
			return state.set(action.key, action[action.key])
		default : 
			return state
	}
}

