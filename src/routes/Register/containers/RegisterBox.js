import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../../components/Input'
import Label from '../../../components/Label'
import { getValue } from '../actions'

let RegisterBox = ({ handleChange }) =>{

	return(
			<div>
				<div>注册</div>
				<Label>用户名</Label><Input  onChange={handleChange('userName')}/>
				<Label>密码</Label><Input  onChange={handleChange('password')} type='password'/>
				<div>
					<a>提交</a>
				</div>
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
		}
	}
}

RegisterBox = connect(null, mapDispatchToProps)(RegisterBox)
export default RegisterBox
