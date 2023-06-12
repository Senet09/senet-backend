import mongoose, { model } from "mongoose";
import SendMail from "../config/SendMail";

const otpSchema =new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
  },
  otp:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: "5m", //This is authomatic deleted after the 5min
  }
}
);

otpSchema.pre("save",async function(){
    try {
        
        await SendMail(this.email, "Verify Email",`${this.otp}`);
    } catch (error) {
        console.log(error.message);
    }
})


const otp = model("Otp", otpSchema);
export default otp;