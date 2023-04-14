import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as planRouter } from "./routes/plan.js";
import { router as usersRouter } from "./routes/userProfile.js";
import { router as planProgressRouter } from "./routes/planProgress.js";

import cors from "cors";
import bodyParser from "body-parser";
import UsersController from "./controllers/users-controller.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};
const app = express();
dotenv.config();
mongoose.set("strictQuery", false);

const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB, options, (err) => {
      if (!err) {
        console.log("Connected to mongoDB.");
      } else {
        console.log("Error in connection " + err);
      }
    });
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
UsersController(app);
app.listen(process.env.PORT || 4000, () => {
  connect();
  console.log("Connected to backend!");
});

app.use("/api", usersRouter);
app.use("/api", planRouter);
app.use("/api", planProgressRouter);
