import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

export default model('Users', UserSchema, 'users')




