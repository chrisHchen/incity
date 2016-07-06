import User from '../models/user'
import config from '../../../config'
import { regValid } from '../../../common/util'
const register = (req, res) => {
	const _user = {}
	_user.userName = req.body.userName
	_user.password = req.body.password

	//validate
	if( !_user.userName || !_user.password || 
			!regValid( config.userNameReg, _user.userName) || 
			!regValid( config.userNameReg, _user.userName)) 
		return res.json({
				isSuccess:false,
				errorCode:1,
				msg:'用户名或密码需6-16位数字，字母，下划线组成'
		})

	User.findOne({userName:_user.userName}, function(err, user){
		if(err){
			console.log(err)
			return
		}
		if(user){
			console.log('user already exists')
			res.json({
				isSuccess:false,
				errorCode:1,
				msg:'该用户已经注册'
			})
		}else{
			var userObj = new User(_user);
			userObj.save(function(err, user){
				if(err){
					console.log(err)
					return
				}
				console.log('user saved successfully')
				req.session.user = user
				res.json({
					isSuccess:true,
					errorCode:0,
					msg:'注册成功'
				})
			})
		}
	})
}

const signin = (req, res) => {
	const _user = req.body
	const userName = _user.userName
	const password = _user.password

	//validate
	if( !regValid( config.userNameReg, userName) || 
			!regValid( config.userNameReg, password)) 
		return res.json({
				isSuccess:false,
				errorCode:1,
				msg:'用户名或密码需6-16位数字，字母，下划线组成'
		})

	User.findOne({userName:userName}, function(err, user){
		if(err){
			console.log(err)
			return
		}
		if(!user){
			return res.json({
				isSuccess:false,
				errorCode:1,
				msg:'该用户还未注册哦~'
			})
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err)
				return
			}
			if(!isMatch){
				res.json({
					isSuccess:false,
					errorCode:2,
					msg:'密码不对哦~'
				})
			}else{
				console.log('login successfully')
				req.session.user = user
				res.json({
					isSuccess:true,
					errorCode:0,
					msg:'登陆成功'
				})
			}
		})
	})
}

const signinRequired = function(req, res, next){
	const user = req.session.user
	if(!user){
		return res.redirect('/register')
	}
	next()
}

const adminRequired = function(req, res, next){
	const user = req.session.user
	if(!user.role || user.role < 10){
		return res.redirect('/login')
	}
	next()
}

export { register, signin, signinRequired, adminRequired}