//http://developer.qiniu.com/article/developer/security/put-policy.html
const config = {
	ACCESS_KEY: 'vTV9A2tVj0CbDwGdQufZufT28YC6DgckqeAu6qHn',
	SECRET_KEY: 'FryBGknaS6Ojjzm5v12NBoqi9ktmHvuMIUPtvmEQ',
	put_policy: {
		scope: 'incity',
		// deadline: parseInt( (new Date().getTime() + 8*3600*1000)/1000 ),
		insertOnly: 1,
		returnBody: '{"key": $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height)}',
		callbackUrl: 'http://476893435.tunnel.2bdata.com/upload/uploadcallback',
		callbackBody: 'format=$(imageInfo.format)&width=$(imageInfo.width)&height=$(imageInfo.height)&endUser=$(endUser)&length=$(x:length)',
		mimeLimit : 'image/*',
		callbackFetchKey: 1,
		fsizeLimit: 1024*1024*2
	},
	Qiniu_UploadUrl: 'http://up.qiniu.com',
	Qiniu_DownloadDomain: 'http://o9opa6tzl.bkt.clouddn.com/',
	QIniu_thumbnail_strategy: '?imageView2/1/w/50/h/50'
}

export default config