import Base from "../models/Base";
import { SOMETHING_WENT_WRONG } from "../utils/constants";

const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const currentUser = await Base.findById(userId);
  console.log(currentUser);
  if (currentUser) {
    return res.status(200).json({ success: true, currentUser });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "No user logged in" });
  }
};

const updateUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    phone,
    profileImageUrl,
    location,
    bio,
  } = req.body;

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

  const userId = req.user._id;

  await Base.findByIdAndUpdate(
    { userId },
    {
      firstName,
      lastName,
      email,
      username,
      phone,
      profileImageUrl,
      location,
      bio,
    },
    { new: true, runValidators: true }
  )
    .then((updatedUser) =>
      res
        .status(200)
        .json({ success: true, message: "User updated", updatedUser })
    )
    .catch((e) => res.status(500).json({ success: false, message: e.message }));
};

const deleteUser = async (req, res) => {
  const userId = req.user;
  console.log(userId);
  await Base.findByIdAndDelete(userId._id)
    .then((deletedUser) =>
      res
        .status(200)
        .json({ success: true, message: "Account deleted", deletedUser })
    )
    .catch((e) => {
      return res.status(500).json({ success: false, message: e.message });
    });
};

const addFollowing = async (req, res) => {
  const loggedUser = req.user;
  const followedUser = req.body;
  const findLoggedUser = await User.findByIdAndUpdate(
    loggedUser._id,
    {
      following: loggedUser.following.append(followedUser._id),
    },
    { new: true }
  )
    .then((res) => res)
    .catch((e) => console.error(e));

  const updateFollowersOfFollowedUser = await User.findByIdAndUpdate(
    followedUser._id,
    { followers: followedUser.followers.append(loggedUser._id) },
    { new: true }
  )
    .then((res) => res)
    .catch((e) => console.error(e));

  if (findLoggedUser && updateFollowersOfFollowedUser) {
    return res.status(200).json({ success: true, followedUser, loggedUser });
  } else {
    return res
      .status(500)
      .json({ success: false, message: SOMETHING_WENT_WRONG });
  }
};

export { getCurrentUser, updateUser, deleteUser, addFollowing };
