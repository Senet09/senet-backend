import User from "../models/User";

const createNewUser = (req, res, next) => {
  const { firstName, lastName, username, email, password, phone, location } =
    req.body;
  const newUserCreated = new User({
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    location,
  });
  return res.status(201).json(newUserCreated);
};

const postLoginUser = (req, res) => {
  const { username, password } = req.body;
};

export { createNewUser, postLoginUser };
