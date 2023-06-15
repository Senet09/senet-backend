import { Router } from "express";
import { createNewUser, postLoginUser } from "../controllers/AuthController";
import { updateUser, deleteUser } from "../controllers/UserController";
import asyncHandler from "../utils/AsyncHandler";
import { upload } from "../utils/storage";
import { emailVerify } from "../controllers/VerifyController";

const userAuthRoutes = Router();

userAuthRoutes
  .route("/register")
  .post(upload.single("profilePicture"), asyncHandler(createNewUser));

userAuthRoutes.route("/login").post(asyncHandler(postLoginUser));

export default userAuthRoutes;
