import {GET_REG_VALUE} from '../constants'
import Immutable, { fromJS } from 'immutable'

export default function register( state = {}, action ) {
	switch (action.type) {
		case GET_REG_VALUE:
			return Immutable.fromJS(state).set(action.key, action[action.key])
		default : 
			return state
	}
}

