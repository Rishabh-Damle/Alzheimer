//you can inforce your codebase should not have any ts-ignores
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { contentRouter } from "./routes/content.js";
import { brainRouter } from "./routes/brain.js";
import { FRONTEND_URL, DB_URL, PORT } from "./config.js";
import cors from "cors";

const app = express();
app.use(express.json());

//configure cors
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

async function startThedatabaseIfOnlyWhenItComes() {
  await mongoose.connect(DB_URL);
  console.log("Database is started");
  app.listen(PORT);
}

startThedatabaseIfOnlyWhenItComes();
