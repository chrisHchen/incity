import { SHOW_THUMBNAIL } from '../constants'
import Immutable from 'immutable'


export default function createPhoto( state = Immutable.fromJS({}), action ) {

	switch (action.type) {
		case SHOW_THUMBNAIL:
			return state.set('photolist', action.payload)
		default : 
			return state
	}
}