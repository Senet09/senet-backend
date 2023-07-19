import SendMail from "../config/SendMail";
import Base from "../../models/Base";
import Token from "../../models/Token";
import crypto from "crypto";
import bcrypt from "bcrypt";

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await Base.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }
  const userId = user._id;
  const tokenExists = await Token.findOne({ userId });
  if (tokenExists) {
    await Token.deleteOne({ userId });
  }

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 10);

  await new Token({
    userId,
    token: hash,
  }).save();

  const link = `localhost:3000/user/reset-password?token=${hash}&userId=${userId}`;

  SendMail(
    email,
    "Senet Password Reset",
    `Here is your url to reset your password: ${link}`
  );
  return res.status(200).json({
    success: true,
    message: "Password reset email sent",
    resetLink: link,
  });
};

const resetPassword = async (req, res) => {
  const { userId, token } = req.query;
  const passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    return res.status(401).json({
      success: false,
      message: "Password reset token expired",
    });
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: "Password reset token expired",
    });
  }

  const { newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  );
  return res.json(200).status({
    success: true,
    message: "Password reset successfully",
  });
};

export { requestPasswordReset, resetPassword };
