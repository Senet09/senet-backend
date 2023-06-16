import Base from "./Base";
import { Schema, model } from "mongoose";

const politicianSchema = Base.discriminator(
  Schema({
    designation: {
      type: String,
    },
    interactionScore: {
      type: Number,
      default: 0,
    },
    achievements: [{ type: String }],
    campaignInformation: [
      {
        type: String,
      },
    ],
    endorsements: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  })
);

const administrationSchema = Base.discriminator(
  Schema({
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    responsiveness: {
      type: Number,
      default: 0,
    },
  })
);

const Politician = model("Politician", politicianSchema);
const Administrator = model("Administrator", administrationSchema);

export { Politician, Administrator };
