import { Router } from "express";
import { createNewUser, postLoginUser } from "../controllers/AuthController";
import { sendOtp } from "../controllers/AuthController";
import asyncHandler from "../utils/AsyncHandler";

const userAuthRoutes = Router();

userAuthRoutes.route("/register").post(asyncHandler(createNewUser));

userAuthRoutes.route("/login").post(asyncHandler(postLoginUser));

userAuthRoutes.route("/sendotp").post(asyncHandler(sendOtp));

export default userAuthRoutes;
