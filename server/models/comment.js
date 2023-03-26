
import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  image_id: { type: String, required: true },
  name: { type: String },
  comment: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false
})

export default model('comments', commentSchema)



