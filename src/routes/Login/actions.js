import { GET_LOGIN_VALUE } from '../constants'
import { replace } from 'react-router-redux'
import { fetchJson } from '../../common/fetchUtil' 

export const getValue = (name, value) => {
	return {	
		type: GET_LOGIN_VALUE,
		key : name,
		[name]: value
	}
}

export const submitLogin = () => {
	return (disptach, getState) => {
		fetchJson({
			url : '/user/signin',
			type: 'POST',
			data: getState().login.toObject(),
			success : (res) => {
				if(res.isSuccess){
					disptach( replace('/') )
				}
			}
		})
	}
}

