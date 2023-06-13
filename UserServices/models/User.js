import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 25,
  },
  phone: {
    type: String,
  },
  profileImageUrl: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String,
  },
  providerUserId: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.isValidPassword = async function isValidPassword(
  userPassword
) {
  const match = await bcrypt.compare(this.password, userPassword);
  return match;
};

const User = model("User", userSchema);

export default User;
