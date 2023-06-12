import User from "../models/User";
import constant from "../constant";
import { validate } from "email-validator";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator"
import Otp from "../models/Otp"
function validatePassword(password) {
  // Check for at least one character
  const hasCharacter = /[a-zA-Z]/.test(password);
  
  // Check for at least one number
  const hasNumber = /\d/.test(password);
  
  // Check for at least one special character
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // Return true if all conditions are met
  return hasCharacter && hasNumber && hasSpecialChar;
}

const sendOtp = async (req, res) => {
  try {
    //validation for all fields are compeleted or not
  const { firstName, lastName, username, email, password, phone, location } =
  req.body;
if (
  !firstName ||
  !lastName ||
  !username ||
  !email ||
  !password ||
  !phone ||
  !location
) {
  return res.status(401).json({
    success: false,
    message: constant.Fill_All_Field,
  });
}
//check email validate
if (!validate(email)) {
  return res.status(401).json({
    success: false,
    message: constant.Email_Formate_Not_Valid,
  });
}
//check the email is alredy exist or not
const existUserEmail = await User.findOne({ email: email });
if (existUserEmail) {
  return res.status(401).json({
    success: false,
    message: constant.Email_Alredy_Exist,
  });
}
//check the userName is alredy exist or not
const existUserUserName = await User.findOne({ email: email });
if (existUserUserName) {
  return res.status(401).json({
    success: false,
    message: constant.UserName_Alredy_Exist,
  });
}

//validation at password
if (!validatePassword(password)) {
  return res.status(401).json({
    success: false,
    message: constant.Password_invalid,
  });
}
//create the otp
let otp = otpGenerator.generate(6, {
  lowerCaseAlphabets: false,
  specialChars: false,
  upperCaseAlphabets: false,
});

//save the otp in db
const otpRes = await Otp.create({email,otp});
res.status(200).json({
  success:true,
  message:constant.Otp_Send,
})
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:constant.SOMETHING_WENT_WRONGE
    })
  }
};

const createNewUser = async(req, res) => {
  try {
    const { firstName, lastName, username, email, password, phone, location , otp } =
    req.body;
if (
  !firstName ||
  !lastName ||
  !username ||
  !email ||
  !password ||
  !phone ||
  !location ||
  !otp
) {
  return res.status(401).json({
    success: false,
    message: constant.Fill_All_Field,
  });
}
//check email validate
if (!validate(email)) {
  return res.status(401).json({
    success: false,
    message: constant.Email_Formate_Not_Valid,
  });
}
//check the email is alredy exist or not
const existUserEmail = await User.findOne({ email: email });
if (existUserEmail) {
  return res.status(401).json({
    success: false,
    message: constant.Email_Alredy_Exist,
  });
}
//check the userName is alredy exist or not
const existUserUserName = await User.findOne({ email: email });
if (existUserUserName) {
  return res.status(401).json({
    success: false,
    message: constant.UserName_Alredy_Exist,
  });
}

//validation at password
if (!validatePassword(password)) {
  return res.status(401).json({
    success: false,
    message: constant.Password_invalid,
  });
}



  const lestestOtp = await Otp.find({email:email}).sort({createdAt:-1}).limit(1);
  //if otp expires
  if (!lestestOtp || lestestOtp.length == 0) {
    return res.status(401).json({
      success: false,
      message: constant.Otp_Not_Found,
    });
  }

    //if otp dose not match
  if (otp !== lestestOtp[0].otp) {
    return res.status(401).json({
      success: false,
      message: "OTP dose not match",
    });
  }

  const HashPass = await bcrypt.hash(password, 10);
  const newUserCreated = new User({
    firstName,
    lastName,
    username,
    email,
    password:HashPass,
    phone,
    location,
    otp
  });

  await newUserCreated.save();
  return res.status(201).json(newUserCreated);
  } catch (error) {
    return res.status(500).json({
      success:false,
      data:error.message,
      message:constant.SOMETHING_WENT_WRONGE
    })
  }
};

const postLoginUser =async (req, res) => {
 try {
  const { username, password } = req.body;
  if(!username || !password)
  {
      return res.status(401).json({
        success:false,
        message:constant.Fill_All_Field,
      })
  }
  if (!validatePassword(password)) {
    return res.status(401).json({
      success: false,
      message: constant.Password_invalid,
    });
  }
  const existUser = await User.findOne({username:username});
  if(!existUser)
  {
    return res.status(401).json({
      success:false,
      message:constant.USER_NOT_FOUND
    })
  }
  const passMatch = await bcrypt.compare(password,existUser.password);
  if(!passMatch)
  { 
    return res.status(401).json({
      success:false,
      message:constant.PASS_NOT_MATCH
    })
  }
  //set jwt with the coockies and add the user id in payload jwt

  //send the response with the token
  return res.status(200).json({
    success:true,
    message:constant.LOGIN_SUCCESSFULL
  })
 } catch (error) {
    return res.status(500).json({
      success:false,
      message:constant.LOGIN_UNSUCCESSFULL
    })
 }

};

export { createNewUser, postLoginUser, sendOtp };
