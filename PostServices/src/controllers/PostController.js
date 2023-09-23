import Post from "../models/Post";
import axios from "axios";

const uploadNewPost = async (req, res) => {
  try {
    const { caption, userId, images } = req.body;

    if (!caption || !userId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //*********upload the images and store the links in imagesArray********

    let imagesArray = [];

    //**********ans will store of the imges link in the imagesArray */

    const newPost = await Post.create({
      user: userId,
      caption,
      images: imagesArray,
      comments: [],
      likes: 0,
    });

    return res.status(200).json({
      success: true,
      data: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: error.message,
      message: "Post not created successfully",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const response = await Post.find({ user: userId });

    return res.status(200).json({
      success: true,
      data: response,
      message: "Post get successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: error.message,
      message: "Post not get successfully",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId, userId, caption } = req.body;

    if (!postId || !userId || !caption) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existPost = await Post.findById(postId);

    if (!existPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }
    let response;
    if (existPost.user !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized , you can not update the post",
      });
    } else {
      response = await Post.findByIdAndUpdate(existPost._id, {
        caption,
      });

      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: error.message,
      message: "Post not updated ",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existPost = await Post.findById(postId);

    if (!existPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }
    let response;
    if (existPost.user !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized , you can not delete the post",
      });
    } else {
      response = await Post.findByIdAndDelete(existPost._id);

      return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: error.message,
      message: "Post not deleted ",
    });
  }
};

export { getAllPosts, updatePost, deletePost, uploadNewPost };
