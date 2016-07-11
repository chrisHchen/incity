import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Input from '../Input'
import classnames from 'classnames'
import config from '../../config'

class ComboInput extends Component{
	componentDidMount(){
		const { populateFormState } = this.props
		populateFormState({
			userName:{data_rule:config.userNameReg, data_message:'用户名或密码需6-16位数字，字母，下划线组成'},
			password:{data_rule:config.userNameReg, data_message:'用户名或密码需6-16位数字，字母，下划线组成'}
		})
	}

	render(){
		const {handleChange, submitHandler, path, btnText, linkText, btnCls} = this.props
		const classname = classnames({
			'btn': true,
			'btn-main': true,
			[btnCls] : !!btnCls
		})
		return(
			<div className='comboInput-wrap'>
				<div className='item-wrap'>
					<Input onChange={handleChange('userName')} placeholder='请输入用户名'/>
					<i className="fa fa-user-md fa-fw fa-lg color-default" aria-hidden="true"></i>
				</div>
				<div className='item-wrap'>
					<Input onChange={handleChange('password')} type='password' placeholder='请输入密码'/>
					<i className="fa fa-lock fa-fw fa-lg color-default" aria-hidden="true"></i>
				</div>
				<a className={classname} onClick={submitHandler}>{btnText}</a>
				<Link className='link' to={path}>{linkText}</Link>
			</div>
		)
	}
}

export default ComboInput