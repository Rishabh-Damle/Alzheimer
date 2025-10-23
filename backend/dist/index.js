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
const DB_URL = config.DB_URL;
const PORT = config.PORT;
const allowedOrigins = ["https://alzheimer-client.vercel.app"];
console.log(PORT);
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    const origin = "https://alzheimer-client.vercel.app";
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
// app.post("/api/v1/brain/share", async (req, res) => {});
// app.get("/api/v1/brain/:shareLink", async (req, res) => {});
async function startThedatabaseIfOnlyWhenItComes() {
    await mongoose.connect(DB_URL);
    console.log("Database is started");
    app.listen(PORT);
}
startThedatabaseIfOnlyWhenItComes();
