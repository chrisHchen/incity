import mongoose from 'mongoose'
import PhotoSchema from '../schemas/photo'

const Photo = mongoose.model('Photo', PhotoSchema)

export default Photo