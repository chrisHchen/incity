import { GET_REG_VALUE} from '../constants'
import Immutable from 'immutable'

export default function register( state = Immutable.fromJS({}), action ) {
	switch (action.type) {
		case GET_REG_VALUE:
			return state.set(action.key, action[action.key])
		default : 
			return state
	}
}

