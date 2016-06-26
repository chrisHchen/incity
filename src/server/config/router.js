import { signinRequired } from '../app/controllers/user'
import Index from '../app/controllers/index'
import {register, signin} from '../app/controllers/user'
import config from '../../config'

export default function(app){

	//pre handler 
	app.use( (req, res, next) => {

		if( config.apiUrl.indexOf(req.path) >= 0 ){
			return next()
		}
		if(!req.session.user && req.path !== '/register'){
			return res.redirect('/register')
		}
		next()
	})

	//server sider rendering
	app.get( '/*', Index )

	//user api
	app.post( '/user/register', register )
	app.post( '/user/signin', signin )
}