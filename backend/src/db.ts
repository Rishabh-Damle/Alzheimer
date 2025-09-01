import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { getConfig } from "./config.js";
const config = getConfig();
console.log(config.DB_URL);
const DB_URL = config.DB_URL;
mongoose.connect(DB_URL);
import { model, Schema } from "mongoose";
const UserSchmea = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchmea);
