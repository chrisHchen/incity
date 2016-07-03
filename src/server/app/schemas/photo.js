import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PhotoSchema = new Schema({
	owner: {type: ObjectId, ref: 'User'},
	photoList:[{
		key:String,
		w: String,
		h: String,
		f: String,
		createAt:{ type:Date, default:new Date() }
	}],
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

PhotoSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	next()
})

PhotoSchema.statics={
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	fetchById: function(id, cb){
		return this.findOne({_id:id}).exec(cb)
	}
}

export default PhotoSchema