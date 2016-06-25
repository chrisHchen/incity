import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10
const UserSchema = new Schema({
	userName:{
		unique:true,
		type:String
	},
	password:String,
	role:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.pre('save', function(next){
	var user = this

	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, encryptPwd){
			if(err){
				return next(err)
			}
			user.password = encryptPwd
			next()
		})
	})
})

UserSchema.methods = {
	comparePassword: (_password, cb) => {
		bcrypt.compare(_password, this.password, function(err, isMatch){
			if(err) return cb(err)
			cb(null,isMatch)
		})
	}
}

UserSchema.statics = {
	fetch: (cb) => this.find({}).sort('meta.updateAt').exec(cb),
	fetchById: (id, cb) => this.find({_id:id}).exec(cb)
}

export default UserSchema