import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  role: {
    type: String,
    default: "user",
  },
  isGithub:{
    type: Boolean,
    default: false
  },
  isGoogle: {
    type: Boolean,
    required: true,
    default: false
  }
});
const userColl = 'users'
export const UserModel = model(userColl, userSchema);