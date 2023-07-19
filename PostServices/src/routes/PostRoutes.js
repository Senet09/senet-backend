import { Router } from "express";
import asyncHandler from "../utils/AsyncHandler";
import {
  uploadNewPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/PostController";

const postRouter = new Router();

// uploading
postRouter.post("/upload", verifyToken, asyncHandler(uploadNewPost));

// updating
postRouter.put("/update/:id", verifyToken, asyncHandler(updatePost));

// deleting
postRouter.delete("/delete-post/:id", verifyToken, asyncHandler(deletePost));

// getting all posts
postRouter.get("/all", verifyToken, asyncHandler(getAllPosts));

export default postRouter;
