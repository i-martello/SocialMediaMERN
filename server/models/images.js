import { Schema, model } from 'mongoose'

const modelSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  url: {type:String, required: true},
  cloud_id: {type:String, required: true}
}, {timestamps: true, versionKey: false})

export default model('Images', modelSchema, 'images')