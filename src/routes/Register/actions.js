import { GET_VALUE } from '../constants'
import { replace } from 'react-router-redux'
import { fetchJson } from '../../common/fetchUtil' 
export const getValue = (name, value) => {
	return {	
		type: GET_VALUE,
		key : name,
		[name]: value
	}
}

export const submitReg = () => {
	return (disptach, getState) => {
		fetchJson({
			url : '/user/register',
			type: 'POST',
			data: getState().register.toObject(),
			success : (res) => {
				if(res.isSuccess){
					disptach( replace('/') )
				}
			}
		})
	}
}

