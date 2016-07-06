import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';

const Toast = ({
	description,
	cls,
	show
}) => {
	const clsName = classnames({
			'dft_toast' : true,
			'show'      : !!show,
			'cls'       : !!cls
		})
		return(
			<div className={clsName}>
				{description}
			</div>
		)
}

Toast.propTypes = {
	cls: PropTypes.string,
	description: PropTypes.string
}

export default Toast