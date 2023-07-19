import Post from "../models/Post";

const uploadNewPost = async (req, res) => {
  const user = req.user;
  const { caption, images } = req.body;

  const findUser = await User.findById(user._id);
  if (!findUser) {
    return res
      .status(403)
      .json({ success: false, message: "FORBIDDEN ACCESS" });
  }
};

const getAllPosts = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

export { getAllPosts, updatePost, deletePost, uploadNewPost };
