import config from '../../../config/qiniu'
import qiniu from 'qiniu'

export const genUpToken = (req, res) => {
	const { ACCESS_KEY, SECRET_KEY, put_policy } = config
	qiniu.conf.ACCESS_KEY = ACCESS_KEY
	qiniu.conf.SECRET_KEY = SECRET_KEY

	//要上传的空间
	const bucketName = put_policy.scope

	//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
	function uptoken(bucket) {
	  const putPolicy = new qiniu.rs.PutPolicy(bucket)
	  putPolicy.deadline = parseInt( (new Date().getTime() + 8*3600*1000)/1000 )
	  putPolicy.scope = put_policy.scope
	  putPolicy.insertOnly = put_policy.insertOnly
	  putPolicy.callbackUrl = put_policy.callbackUrl
	  putPolicy.callbackBody = put_policy.callbackBody
	  putPolicy.callbackFetchKey = put_policy.callbackFetchKey
	  putPolicy.fsizeLimit = put_policy.fsizeLimit
	  putPolicy.mimeLimit = put_policy.mimeLimit
	  return putPolicy.token()
	}

	res.json({
		isSuccess: true,
		token : uptoken( bucketName )//生成上传 Token
	})
	
}


export const uploadCallback = (req, res) => {
	const reqBody = req.body
	const fileName = new Date().getTime() + '' + parseInt(Math.random()*100000)
	res.setHeader('Content-Type', 'application/json;charset=utf-8')
	res.json({
		key: fileName,
		payload:{
			isSuccess: true,
			fileName: fileName
		}
	})
} 
