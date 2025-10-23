import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { contentRouter } from "./routes/content.js";
import { brainRouter } from "./routes/brain.js";
import { getConfig } from "./config.js";

const config = getConfig();
const PORT = config.PORT;
const DB_URL = config.DB_URL;

const allowedOrigins = ["https://alzheimer-client.vercel.app"];
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const origin = allowedOrigins[0];
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

async function startServer() {
  await mongoose.connect(DB_URL);
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
