import {GET_VALUE} from '../constants'
import Immutable, { fromJS } from 'immutable'

export default function Register( state = {}, action ) {
	switch (action.type) {
		case GET_VALUE:
			return Immutable.fromJS(state).set(action.key, action[action.key])
		default : 
			return state
	}
}

