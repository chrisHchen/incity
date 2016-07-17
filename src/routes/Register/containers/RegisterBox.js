import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { processAnimation } from '../../../common/util'
import ComboInput from '../../../components/ComboInput'
import { getValue, submitReg, populateFormState } from '../actions'

let RegisterBox = ({ handleChange, submitReg, populateFormState }) =>{

	return(
		<div className='pageLayout'>
			<ComboInput 
				handleChange={handleChange} 
				submitHandler={submitReg} 
				populateFormState={populateFormState}
				path='/login'
				btnText='注  册'
				linkText='我要登录~'/>
		</div>
	)
}

RegisterBox.propTypes = {
	handleChange: PropTypes.func,
	submitReg   : PropTypes.func
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
		},
		populateFormState:(initState) => {
			dispatch( populateFormState(initState) )
		}
	}
}

RegisterBox = connect( null, mapDispatchToProps)(RegisterBox)

RegisterBox.prototype.componentWillAppear = function(callback){
	const el = ReactDOM.findDOMNode(this)
	processAnimation(el, 'fadeInOut-appear', 'fadeInOut-appear-active', 1500, callback)
}

RegisterBox.prototype.componentWillEnter = function(callback){
	const el = ReactDOM.findDOMNode(this)
	processAnimation(el, 'right-enter', 'right-enter-active', 500, callback)
}
RegisterBox.prototype.componentWillLeave = function(callback){
	const el = ReactDOM.findDOMNode(this)
	processAnimation(el, 'right-leave', 'right-leave-active', 600, callback)
}

export default RegisterBox
