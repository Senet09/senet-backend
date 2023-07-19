import User from "../models/Base";
import constants from "../utils/constants";
import { validate } from "email-validator";
import { validatePassword } from "../middlewares/middleware";
import { generateToken } from "../middlewares/middleware";

/* ------- USER REGISTER FUNCTION ------- */
const createNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    location,
    profileImageUrl,
  } = req.body;
  if (!firstName || !username || !email || !password || !location) {
    return res.status(401).json({
      success: false,
      message: constants.Fill_All_Fields,
    });
  }
  //check email validate
  if (!validate(email)) {
    return res.status(401).json({
      success: false,
      message: constants.Email_Format_Not_Valid,
    });
  }
  //check the email is already exist or not
  const existUserEmail = await User.findOne({ email: email });
  if (existUserEmail) {
    return res.status(401).json({
      success: false,
      message: constants.Email_Already_Exists,
    });
  }

  //check the userName is already exist or not
  const existUserName = await User.findOne({ email: email });
  if (existUserName) {
    return res.status(401).json({
      success: false,
      message: constants.UserName_Already_Exists,
    });
  }

  //validation at password
  if (!validatePassword(password)) {
    return res.status(401).json({
      success: false,
      message: constants.Password_invalid,
    });
  }

  // saving the user's details
  const newUserCreated = new User({
    firstName,
    lastName,
    username,
    email,
    password,
    location,
    phone,
    profileImageUrl,
  });

  await newUserCreated.save();

  await generateToken(existUser)
    .then((token) => {
      // console.log(existUser);
      return res.status(200).json({
        success: true,
        message: constants.REGISTER_SUCCESSFUL,
        user: newUserCreated,
        token,
      });
    })
    .catch((e) =>
      res.status(500).json({
        success: false,
        message: e.message,
      })
    );
};

/* ------ USER LOGIN ----- */
const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: constants.Fill_All_Fields,
    });
  }

  let existUser = null;
  if (validate(email)) {
    existUser = await User.findOne({ email: email });
  }

  if (!existUser) {
    return res.status(401).json({
      success: false,
      message: constants.USER_NOT_FOUND,
    });
  }
  const passMatch = existUser.isValidPassword(existUser.password);
  if (!passMatch) {
    return res.status(401).json({
      success: false,
      message: constants.PASS_NOT_MATCH,
    });
  }

  await generateToken(existUser)
    .then((token) => {
      // console.log(existUser);
      return res.status(200).json({
        success: true,
        message: "Logged In",
        user: existUser,
        token,
      });
    })
    .catch((e) =>
      res.status(500).json({
        success: false,
        message: e.message,
      })
    );
};

export { createNewUser, postLoginUser };
