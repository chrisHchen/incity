import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { processAnimation } from '../../../common/util'
import ComboInput from '../../../components/ComboInput'
import { getValue, submitLogin } from '../actions'

let LoginBoxAnim = ({ handleChange, submitLogin }) =>{

	return(
		<div>
			<ComboInput 
				handleChange={handleChange} 
				submitHandler={submitLogin} 
				path='/register'
				btnText='登  录'
				linkText='还没账号？赶紧注册'
				/>
		</div>
	)
}

LoginBoxAnim.propTypes = {
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
		}
	}
}

LoginBoxAnim = connect( null, mapDispatchToProps)(LoginBoxAnim)

class LoginBox extends Component{
	componentWillAppear(callback){
		const el = this.refs.login
		processAnimation(el, 'fadeInOut-appear', 'fadeInOut-appear-active', 1500, callback)
	}
	componentWillEnter(callback){
		const el = this.refs.login
		processAnimation(el, 'left-enter', 'left-enter-active', 500, callback)
	}
	componentWillLeave(callback){
		const el = this.refs.login
		processAnimation(el, 'left-leave', 'left-leave-active', 600, callback)
	}
	render(){
		return(
			<div className='pageLayout' ref='login'>
					<LoginBoxAnim />
			</div>
		)
	}
} 

export default LoginBox
