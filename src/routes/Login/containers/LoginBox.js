import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Input from '../../../components/Input'
import Label from '../../../components/Label'
import { getValue, submitLogin } from '../actions'

let LoginBox = ({ handleChange, submitLogin }) =>{

	return(
			<div>
				<div>登陆</div>
				<Label>用户名</Label><Input  onChange={handleChange('userName')}/>
				<Label>密码</Label><Input  onChange={handleChange('password')} type='password'/>
				<div>
					<button onClick={submitLogin}>登陆</button>
					<Link to='/register'>注册</Link>
				</div>
			</div>
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
