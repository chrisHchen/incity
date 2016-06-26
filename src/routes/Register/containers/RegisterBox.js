import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../../components/Input'
import Label from '../../../components/Label'
import { getValue, submitReg } from '../actions'

let RegisterBox = ({ handleChange, submitReg }) =>{

	return(
			<div>
				<div>注册</div>
				<Label>用户名</Label><Input  onChange={handleChange('userName')}/>
				<Label>密码</Label><Input  onChange={handleChange('password')} type='password'/>
				<div>
					<button onClick={submitReg}>提交</button>
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
		},
		submitReg : () => {
			dispatch( submitReg() )
		}
	}
}

RegisterBox = connect(null, mapDispatchToProps)(RegisterBox)
export default RegisterBox
