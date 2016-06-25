import {
	GET_VALUE
} from '../constants'

export const getValue = (name, value) => {
	return {	
		type: GET_VALUE,
		key : name,
		[name]: value
	}
}

