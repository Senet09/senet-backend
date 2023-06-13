import jwt from "jsonwebtoken";

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

const generateToken = (user) => {
  jwt.sign({ user }, "privatekey", (err, token) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "JWT ERROR",
      });
    }
    return token;
  });
};

const verifyToken = (req, res) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    return res.status(200).json({ token });
  } else {
    //If header is undefined return Forbidden (403)
    return res.status(403).json({ message: "Unauthorized Access" });
  }
};

export { validatePassword, verifyToken, generateToken };
