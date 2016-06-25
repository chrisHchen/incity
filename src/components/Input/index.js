import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

const Input = ( {name, cls, ...more} ) => {
	const clsName = {
		'dft_input' : true,
		'cls'       : !!cls
	}
	
	return (
		<input className={clsName} name={name} {...more}/>
	)
}

Input.propTypes = {
	handleChange : PropTypes.func,
	cls          : PropTypes.string,
	name         : PropTypes.string
}

export default Input

