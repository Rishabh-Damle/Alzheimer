//you can inforce your codebase should not have any ts-ignores
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { contentRouter } from "./routes/content.js";
import { brainRouter } from "./routes/brain.js";
import { getConfig } from "./config.js";
const config = getConfig();
console.log("DB_URL from config:", config.DB_URL);
console.log("PORT from config:", config.PORT);
import cors from "cors";
const DB_URL = config.DB_URL;
const PORT = config.PORT;
console.log(PORT);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);
async function startThedatabaseIfOnlyWhenItComes() {
    await mongoose.connect(DB_URL);
    console.log("Database is started");
    app.listen(PORT);
}
startThedatabaseIfOnlyWhenItComes();
