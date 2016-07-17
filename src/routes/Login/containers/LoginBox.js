import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { processAnimation } from '../../../common/util'
import ComboInput from '../../../components/ComboInput'
import { getValue, submitLogin, populateFormState } from '../actions'
import ReactDOM from 'react-dom'

let LoginBox = ({ handleChange, submitLogin, populateFormState }) =>{

	return(
		<div className='pageLayout'>
			<ComboInput 
				handleChange={handleChange} 
				submitHandler={submitLogin} 
				populateFormState={populateFormState}
				path='/register'
				btnText='登  录'
				linkText='还没账号？赶紧注册'
				/>
		</div>
	)
}

LoginBox.propTypes = {
	handleChange: PropTypes.func,
	submitLogin : PropTypes.func
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
		},
		populateFormState:(initState) => {
			dispatch( populateFormState(initState) )
		}
	}
}

LoginBox = connect( null, mapDispatchToProps)(LoginBox)

LoginBox.prototype.componentWillAppear = function(callback){
	const el = ReactDOM.findDOMNode(this)
	processAnimation(el, 'fadeInOut-appear', 'fadeInOut-appear-active', 1500, callback)
}

LoginBox.prototype.componentWillEnter = function(callback){
	const el = ReactDOM.findDOMNode(this)
	processAnimation(el, 'left-enter', 'left-enter-active', 500, callback)
}

LoginBox.prototype.componentWillLeave = function(callback){
	const el = ReactDOM.findDOMNode(this)
	processAnimation(el, 'left-leave', 'left-leave-active', 600, callback)
}

export default LoginBox
