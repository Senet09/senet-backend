import jwt from "jsonwebtoken";
import constants from "../utils/constants";

const validatePassword = (password) => {
  // Check for at least one character
  const hasCharacter = /[a-zA-Z]/.test(password);

  // Check for at least one number
  const hasNumber = /\d/.test(password);

  // Check for at least one special character
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // Return true if all conditions are met
  return hasCharacter && hasNumber && hasSpecialChar;
};

const generateToken = async (user) => {
  return new Promise((resolve, reject) => {
    if (user) {
      jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "JWT ERROR",
          });
        }
        resolve(token);
      });
    } else {
      reject({ message: constants.LOGIN_UNSUCCESSFUL });
    }
  });
};

const verifyToken = (req, res, next) => {
  // const header = req.headers.authorization;

  // if (typeof header !== "undefined") {
  //   const bearer = header.split(" ");
  //   const token = bearer[1];

  //   next(token);
  // } else {
  //   //If header is undefined return Forbidden (403)
  //   return res.status(403).json({ message: "Unauthorized Access" });
  // }

  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ status: false, message: "Token required" });
  }

  // ! USE ENV VARIABLE
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`JWT: ${err.message}`);
      return res
        .status(401)
        .json({ status: false, error: "Token is not valid" });
    }
    req.user = decoded;
    next();
  });
};

export { validatePassword, verifyToken, generateToken };
