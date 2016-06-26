import {GET_LOGIN_VALUE} from '../constants'
import Immutable, { fromJS } from 'immutable'

export default function login( state = {}, action ) {
	switch (action.type) {
		case GET_LOGIN_VALUE:
			return Immutable.fromJS(state).set(action.key, action[action.key])
		default : 
			return state
	}
}

