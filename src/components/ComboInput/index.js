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
				<Input onChange={handleChange('userName')}/>
			</div>
			<div className='item-wrap'>
				<Input onChange={handleChange('password')} type='password'/>
			</div>

			<a className={classname} onClick={submitHandler}>{btnText}</a>
			<Link className='link' to={path}>{linkText}</Link>
		</div>
	)
}

export default ComboInput