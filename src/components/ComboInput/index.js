import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Input from '../Input'
import classnames from 'classnames'

const ComboInput = ({
	handleChange,
	submitHandler,
	path,
	btnText,
	linkText,
	btnCls
}) => {
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

export default ComboInput