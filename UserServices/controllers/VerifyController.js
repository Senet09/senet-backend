import otpGenerator from "otp-generator";
import Otp from "../models/Otp";
import SendMail from "../config/SendMail";

const emailVerify = async (req, res) => {
  const email = req.user.email;

  //create the otp
  let otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });

  //save the otp in db
  const otpRes = await Otp.create({ email, otp });
  await otpRes.save();

  //send the mail
  await SendMail(email, "Verify Email", otpRes.otp);

  //send the sms
};

export { emailVerify };
