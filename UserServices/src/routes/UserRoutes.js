import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";
import asyncHandler from "../../utils/AsyncHandler";
import { emailVerify } from "../controllers/VerifyController";
import { verifyToken } from "../../middlewares/middleware";
import { requestPasswordReset, resetPassword } from "../services/UserService";

const userRoutes = Router();

userRoutes.post("/verify-user", verifyToken, asyncHandler(emailVerify));

userRoutes
  .route("/:id")
  .get(verifyToken, asyncHandler(getCurrentUser))
  .put(verifyToken, asyncHandler(updateUser))
  .delete(verifyToken, asyncHandler(deleteUser));

userRoutes
  .route("/reset-password")
  .post(verifyToken, asyncHandler(requestPasswordReset));

userRoutes.route("/reset-password/:tokenId").post(asyncHandler(resetPassword));

export default userRoutes;
