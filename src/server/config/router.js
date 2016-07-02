import { signinRequired } from '../app/controllers/user'
import Index from '../app/controllers/index'
import {register, signin} from '../app/controllers/user'
import {genUpToken, uploadCallback} from '../app/controllers/upload'
import config from '../../config'

export default function(app){

	//pre handler 
	app.use( (req, res, next) => {

		if( config.apiUrl.indexOf(req.path) >= 0 ){
			return next()
		}
		if(!req.session.user && req.path !== '/login'){
			return res.redirect('/login')
		}
		if(req.session.user && config.noRedirectView.indexOf(req.path) >= 0 ){
			return res.redirect('/')
		}
		next()
	})

	//server sider rendering
	app.get( '/*', Index )

	//user api
	app.post( '/user/register', register )
	app.post( '/user/signin', signin )

	//file upload
	app.post( '/upload/getuptoken', genUpToken)
	app.post( '/upload/uploadcallback', uploadCallback )
}