import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Input from '../../../components/Input'
import ComboInput from '../../../components/ComboInput'
import PageLayout from '../../../layouts/PageLayout'
import { getValue, submitLogin } from '../actions'

let LoginBox = ({ handleChange, submitLogin }) =>{

	return(
			<PageLayout>
				<ComboInput 
					handleChange={handleChange} 
					submitHandler={submitLogin} 
					path='/register'
					btnText='登录'
					linkText='还没账号？赶紧注册'/>
			</PageLayout>
	)
}

LoginBox.propTypes = {
	handleChange: PropTypes.func
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {	
		handleChange: (name) => (e) => {
			dispatch(
				getValue(name, e.target.value)
			)
		},
		submitLogin : () => {
			dispatch( submitLogin() )
		}
	}
}

LoginBox = connect(null, mapDispatchToProps)(LoginBox)
export default LoginBox
