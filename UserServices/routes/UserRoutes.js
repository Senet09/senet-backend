import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";
import asyncHandler from "../utils/AsyncHandler";
import { emailVerify } from "../controllers/VerifyController";
import { verifyToken } from "../middleware/middlewares";

const userRoutes = Router();

userRoutes.post("/verify-user", asyncHandler(emailVerify));

userRoutes
  .route("/:id")
  .get(verifyToken, asyncHandler(getCurrentUser))
  .put(verifyToken, asyncHandler(updateUser))
  .delete(verifyToken, asyncHandler(deleteUser));

export default userRoutes;
