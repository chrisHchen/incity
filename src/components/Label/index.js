import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';

const Label = ({ children, cls }) => {
	const clsName = classnames({
		'dft_label' : true,
		'cls'       : !!cls
	})

  return(
  	<label className={clsName}>
  		{children}
  	</label>
  )
}

Label.propTypes = {
	cls: PropTypes.string
}

export default Label