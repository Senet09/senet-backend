import Base from "./Base";
import { Schema, model } from "mongoose";

const politicianSchema = Base.discriminator(
  Schema({
    aadhar: {
      type: BigInt,
      required: true,
    },
    aadharVerification: {
      type: Boolean,
      default: false,
    },
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
        campaign: {
          type: String,
        },
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
    aadhar: {
      type: BigInt,
      required: true,
    },
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
