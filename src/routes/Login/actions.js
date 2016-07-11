import { GET_LOGIN_VALUE, TOAST_SHOW, TOAST_HIDE, GET_LOGIN_INITSTATE } from '../constants'
import { regValid } from '../../common/util'
import config from '../../config'
import { replace } from 'react-router-redux'
import { fetchJson } from '../../common/fetchUtil' 
import { validate, destructFormData } from '../../common/util'

export const getValue = (name, value) => {
	return {	
		type: GET_LOGIN_VALUE,
		key : name,
		[name]: value
	}
}

export const populateFormState = (initState) => {
	return {	
		type: GET_LOGIN_INITSTATE,
		payload: initState
	}
}

export const submitLogin = () => {
	return (disptach, getState) => {
		const formData = getState().login.toJS()
		//validate
		const isValid = validate(formData,(msg) => {
			disptach(showToast(msg, disptach))
		})

		if(!isValid) return

		fetchJson({
			url : '/user/signin',
			type: 'POST',
			data: destructFormData(formData),
			success : (res) => {
				if(res.isSuccess){
					disptach( replace('/') )
				}else{
					disptach(showToast(res.msg, disptach))
				}
			}
		})
	}
}

const showToast = (desc, disptach) => {
	setTimeout(() => {
		disptach(hideToast())
	}, 2000)

	return {
		type: TOAST_SHOW,
		payload:{
			toastDesc: desc,
			toastShow: true
		}
	}
}

const hideToast = () => {
	return {
		type: TOAST_HIDE,
		payload:{
			toastShow: false
		}
	}
}
