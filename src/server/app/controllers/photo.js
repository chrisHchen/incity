import Photo from '../models/photo'

const savePhoto = (req, res) => {

	res.setHeader('Content-Type', 'application/json;charset=utf-8')
	
	const reqBody = req.body
	const endUser = reqBody.endUser
	const width = reqBody.width
	const height = reqBody.height
	const format = reqBody.format
	const length = reqBody.length
	const key = new Date().getTime() + '' + parseInt(Math.random()*100000)
	const _photo = {
		owner: endUser,
		photoList:[{
			key: key,
			w: width,
			h: height,
			f: format
		}]
	}
	

	Photo.findOne({owner:endUser}, function(err, photo){
		if(err){
			console.log(err)
			return
		}
		if(photo){
			photo.photoList.unshift(_photo.photoList[0])
			photo.save( function(err, photo) { // update
				if(err){
					console.log(err)
					return
				}
				res.json({
					key: key,
					payload: {
						isSuccess: true,
						fileNames:photo.photoList
					}
				})
			})
		}else{
			console.log(_photo)
			const photo = new Photo( _photo )
			photo.save( function(err, photo){ // insert
				if(err){
					console.log(err)
					return
				}
				res.json({
					key: key,
					payload:{
						isSuccess: true,
						fileNames: photo.photoList
					}
				})
			})
		}
	})
}
export { savePhoto }