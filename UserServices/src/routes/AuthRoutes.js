import { Router } from "express";
import { createNewUser, postLoginUser } from "../controllers/AuthController";
import { verifyToken } from "../middlewares/middleware";
import asyncHandler from "../utils/AsyncHandler";
import { upload } from "../utils/storage";

const userAuthRoutes = Router();

userAuthRoutes
  .route("/register")
  .post(upload.single("profilePicture"), asyncHandler(createNewUser));

userAuthRoutes.route("/login").post(asyncHandler(postLoginUser));

export default userAuthRoutes;
