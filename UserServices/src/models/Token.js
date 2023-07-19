// this model is for password reset functionality
import {Schema, model} from mongoose;

const tokenSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Base",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "15m",
  }
})

const Token = model("Token", tokenSchema);
export default Token;
