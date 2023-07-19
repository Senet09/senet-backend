import express from "express";
import bodyParser from "body-parser";
import userAuthRoutes from "./src/routes/AuthRoutes";
import userRoutes from "./src/routes/UserRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import "./src/middlewares/passport";

const app = express();

const mongoDBURL = "mongodb://127.0.0.1:27017/senet";

// loading .env
dotenv.config();

// file upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// app setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app routes
app.use("/user", userAuthRoutes);
app.use("/user", userRoutes);

// PORT
const PORT = process.env.PORT || 3001;

// opening server
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
