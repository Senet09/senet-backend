import { Schema, model } from "mongoose";

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
});

const Post = model("Post", postSchema);

export default Post;
