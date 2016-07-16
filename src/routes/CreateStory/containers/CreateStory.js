import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../../components/Input'
import Label from '../../../components/Label'
import { upload } from '../actions'

let CreateBox = ({ upload }) =>{

	return(
			<div>
				<div>上传图片</div>
				<Label>照片</Label><Input type='file' onChange={upload} multiple='multiple'/>
			</div>
	)
}

CreateBox.propTypes = {
	upload: PropTypes.func
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {	
		upload: (e) => {
			dispatch( upload(e.target) )
		}
	}
}

CreateBox = connect(null, mapDispatchToProps)(CreateBox)
export default CreateBox
