import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const baseSchema = new Schema({
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
    max: 50,
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
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Politician", "Administrator", "User"],
    default: "User",
  },
  bio: {
    type: String,
    default: "",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

baseSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(this.password, 10);
  return next();
});

baseSchema.methods.isValidPassword = async function isValidPassword(
  userPassword
) {
  const match = await bcrypt.compare(this.password, userPassword);
  return match;
};

const Base = model("User", baseSchema);

export default Base;
