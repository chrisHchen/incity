import { signinRequired } from '../app/controllers/user'
import Index from '../app/controllers/index'

export default function(app){

	//pre handler 
	app.use( (req, res, next) => {
		if(!req.session.user && req.path !== '/register'){
			return res.redirect('/register')
		}
		next()
	})

	//server sider rendering
	app.get('/*', Index)
}