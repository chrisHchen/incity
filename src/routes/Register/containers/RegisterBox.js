import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import ComboInput from '../../../components/ComboInput'
import PageLayout from '../../../layouts/PageLayout'
import { getValue, submitReg } from '../actions'

let RegisterBox = ({ handleChange, submitReg }) =>{

	return(
		<div className='pageLayout'>
			<ComboInput 
				handleChange={handleChange} 
				submitHandler={submitReg} 
				path='/login'
				btnText='注册'
				linkText='已经有账号？我要登录'/>
		</div>
	)
}

RegisterBox.propTypes = {
	handleChange: PropTypes.func
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {	
		handleChange: (name) => (e) => {
			dispatch(
				getValue(name, e.target.value)
			)
		},
		submitReg : () => {
			dispatch( submitReg() )
		}
	}
}

RegisterBox = connect(null, mapDispatchToProps)(RegisterBox)
export default RegisterBox
