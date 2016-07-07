import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { processAnimation } from '../../../common/util'
import ComboInput from '../../../components/ComboInput'
import PageLayout from '../../../layouts/PageLayout'
import Toast from '../../../components/Toast'
import { getValue, submitReg } from '../actions'

let RegisterBoxAnim = ({ handleChange, submitReg, toastDesc, toastShow }) =>{

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

RegisterBoxAnim.propTypes = {
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

RegisterBoxAnim = connect( mapStateToProps, mapDispatchToProps)(RegisterBoxAnim)

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
