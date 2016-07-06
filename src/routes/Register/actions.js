import { GET_REG_VALUE, TOAST_SHOW, TOAST_HIDE } from '../constants'
import { regValid } from '../../common/util'
import config from '../../config'
import { replace } from 'react-router-redux'
import { fetchJson } from '../../common/fetchUtil' 
export const getValue = (name, value) => {
	return {	
		type: GET_REG_VALUE,
		key : name,
		[name]: value
	}
}

export const submitReg = () => {
	return (disptach, getState) => {
		const data = getState().register.toObject()
		//validate
		if( !data.userName || !data.password || !regValid(config.userNameReg, data.userName) || 
				!regValid(config.passwordReg, data.password)){
				disptach(showToast('用户名或密码需6-16位数字，字母，下划线组成', disptach))
				return
		}
		fetchJson({
			url : '/user/register',
			type: 'POST',
			data: data,
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