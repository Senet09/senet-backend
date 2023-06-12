import { Schema, model } from "mongoose";

const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 60,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 25,
  },
  phone: {
    type: BigInt,
  },
  profilePicture: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
});



const User = model("User", userSchema);
export default User;