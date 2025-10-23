const serverlessExpress = require("@vendia/serverless-express");
import app from "../app.js";
import mongoose from "mongoose";
import { getConfig } from "../config.js";
const config = getConfig();
const DB_URL = config.DB_URL;
// Reuse DB connection across serverless invocations
let isConnected = false;
async function connectDB() {
    if (!isConnected) {
        await mongoose.connect(DB_URL);
        isConnected = true;
        console.log("MongoDB connected");
    }
}
export default async function handler(req, res) {
    await connectDB();
    return serverlessExpress({ app })(req, res);
}
