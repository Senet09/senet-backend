import express from "express";
import bodyParser from "body-parser";
import userAuthRoutes from "./routes/AuthRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

const mongoDBURL = "mongodb://127.0.0.1:27017/senet";

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userAuthRoutes);

const PORT = process.env.NODE_SERVER_PORT || 3000;

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("app running on port ", PORT);
    });
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(`Error: ${error}\nDid not connect to db`);
  });
