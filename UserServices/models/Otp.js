import mongoose, { model } from "mongoose";
import SendMail from "../config/SendMail";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: "5m", //This is automatically deleted after 5mins
  },
});

const otp = model("Otp", otpSchema);
export default otp;
