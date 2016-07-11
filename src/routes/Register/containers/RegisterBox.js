import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { processAnimation } from '../../../common/util'
import ComboInput from '../../../components/ComboInput'
import { getValue, submitReg, populateFormState } from '../actions'

let RegisterBoxAnim = ({ handleChange, submitReg, populateFormState }) =>{

	return(
		<ComboInput 
			handleChange={handleChange} 
			submitHandler={submitReg} 
			populateFormState={populateFormState}
			path='/login'
			btnText='注  册'
			linkText='我要登录~'/>
	)
}

RegisterBoxAnim.propTypes = {
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

RegisterBoxAnim = connect( null, mapDispatchToProps)(RegisterBoxAnim)

class RegisterBox extends Component{
	componentWillAppear(callback){
		const el = this.refs.register
		processAnimation(el, 'fadeInOut-appear', 'fadeInOut-appear-active', 1500, callback)
	}
	componentWillEnter(callback){
		const el = this.refs.register
		processAnimation(el, 'right-enter', 'right-enter-active', 500, callback)
	}
	componentWillLeave(callback){
		const el = this.refs.register
		processAnimation(el, 'right-leave', 'right-leave-active', 600, callback)
	}
	render(){
		return(
			<div className='pageLayout' ref='register'>
					<RegisterBoxAnim />
			</div>
		)
	}
}

export default RegisterBox
