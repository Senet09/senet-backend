import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  messages: [
    {
      content: {
        type: String,
      },
      sentTo: {
        type: String,
      },
      time: {
        type: Date,
      },
    },
  ],
});

const Message = model("Message", chatSchema);
export default Chat;
