import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import config from '../../../config/qiniu'
import Input from '../../../components/Input'
import Label from '../../../components/Label'
import { upload } from '../actions'

let CreateBox = ({ upload, photolist }) =>{
	const thumbnailList = []
	if(photolist){
		console.log(photolist)
		const fileNames = photolist.fileNames,
					Qiniu_DownloadDomain = config.Qiniu_DownloadDomain, 
					QIniu_thumbnail_strategy = config.QIniu_thumbnail_strategy
		if(fileNames && fileNames.length > 0){
			fileNames.forEach( (item, index) => {
				thumbnailList.push(
					<img src={Qiniu_DownloadDomain + item.key + QIniu_thumbnail_strategy} alt="" key={index}>
					</img>
				)
			})
		}
	}
	return(
			<div>
				<div>上传图片</div>
				<Label>照片</Label><Input type='file' onChange={upload} multiple='multiple'/>
				{ thumbnailList.length>0 ? thumbnailList : null}
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

const mapStateToProps = (state, ownProps) => {
	return {	
		photolist: state.createPhoto.get('photolist')
	}
}

CreateBox = connect(mapStateToProps, mapDispatchToProps)(CreateBox)
export default CreateBox
