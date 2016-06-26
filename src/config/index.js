const config = {
	dbURI : 'mongodb://127.0.0.1:12345/gf',

	//filter url for restful api
	apiUrl : ['/user/register', '/user/signin'],


	//view request that should not be redirected
	noRedirectView : ['/register', '/login'] 
}

export default config