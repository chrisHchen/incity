import { put_policy, ACCESS_KEY, SECRET_KEY } from '../../../config/qiniu'
import qiniu from 'qiniu'

export const genUpToken = function(req, res) {

	qiniu.conf.ACCESS_KEY = ACCESS_KEY
	qiniu.conf.SECRET_KEY = SECRET_KEY

	//要上传的空间
	const bucketName = put_policy.scope

	//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
	function uptoken(bucket) {
	  const putPolicy = new qiniu.rs.PutPolicy(bucket)
	  putPolicy.deadline = put_policy.deadline
	  putPolicy.insertOnly = put_policy.insertOnly
	  putPolicy.callbackUrl = put_policy.callbackUrl
	  putPolicy.callbackHost = put_policy.callbackHost
	  putPolicy.callbackBody = put_policy.callbackBody
	  putPolicy.callbackFetchKey = put_policy.callbackFetchKey
	  putPolicy.fsizeLimit = put_policy.fsizeLimit
	  return putPolicy.token()
	}

	//生成上传 Token
	return uptoken( bucketName )
}


export const uploadCallback = function(req, res){
	const reqBody = req.params
	console.log(reqBody)
	const fileName = new Date().getTime() + '' + Math.random()*100000
	res.json({
		key: fileName,
		payload:{
			isSuccess: true,
			fileName: fileName
		}
	})
} 
