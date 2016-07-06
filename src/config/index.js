const config = {
	dbURI : 'mongodb://127.0.0.1:12345/gf',

	//filter url for restful api
	apiUrl : ['/user/register', '/user/signin', '/upload/getuptoken', '/upload/uploadcallback'],


	//view request that should not be redirected
	noRedirectView : ['/register', '/login'],

	//RegExp
	userNameReg : new RegExp(/^[0-9a-zA-Z_]{6,16}$/),
	passwordReg : new RegExp(/^[0-9a-zA-Z_]{6,16}$/)
}

export default config