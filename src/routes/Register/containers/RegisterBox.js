import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import ComboInput from '../../../components/ComboInput'
import PageLayout from '../../../layouts/PageLayout'
import Toast from '../../../components/Toast'
import { getValue, submitReg } from '../actions'

let RegisterBox = ({ handleChange, submitReg, toastDesc, toastShow }) =>{

	return(
		<div className='pageLayout'>
			<ComboInput 
				handleChange={handleChange} 
				submitHandler={submitReg} 
				path='/login'
				btnText='注  册'
				linkText='我要登录~'/>
			{toastShow && <Toast description={toastDesc} show={true}/>}
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

const mapStateToProps = (state, ownProps) => {
	return {
		toastDesc:state.register.get('toastDesc'),
		toastShow:state.register.get('toastShow')
	}
}

RegisterBox = connect( mapStateToProps, mapDispatchToProps)(RegisterBox)
export default RegisterBox
