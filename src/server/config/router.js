import { signinRequired } from '../app/controllers/user'
import Index from '../app/controllers/index'

module.exports = function(app){

	//pre handler 
	app.use(function(req, res, next){
		var _user=req.session.user;
		app.locals.user=_user;
		return next();
	})

	//server sider rendering
	app.get('/*', Index)
}