//http://developer.qiniu.com/article/developer/security/put-policy.html
const config = {
	ACCESS_KEY: 'vTV9A2tVj0CbDwGdQufZufT28YC6DgckqeAu6qHn',
	SECRET_KEY: 'FryBGknaS6Ojjzm5v12NBoqi9ktmHvuMIUPtvmEQ',
	put_policy: {
		scope: 'incity',
		deadline: parseInt( (new Date().getTime() + 8*3600*1000)/1000 ),
		insertOnly: 1,
		returnBody: '{"key": $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height)}',
		callbackUrl: 'http://9ea67ecd.ngrok.io//upload/uploadcallback',
		callbackHost: 'http://9ea67ecd.ngrok.io',
		callbackBody: '{key=$(key)&hash=$(etag)&w=$(imageInfo.width)&h=$(imageInfo.height)}',
		callbackFetchKey: 1,
		fsizeLimit: 1024*1024*8
	},
	Qiniu_UploadUrl: 'http://up.qiniu.com'
}