import dotenv from "dotenv";
dotenv.config();
import mongoose, { Types } from "mongoose";
import { getConfig } from "./config.js";
const config = getConfig();
console.log(config.DB_URL);
const DB_URL = config.DB_URL;
mongoose.connect(DB_URL);
import { model, Schema } from "mongoose";
import { required } from "zod/mini";

//user schema
const UserSchmea = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchmea);

//content schema
const contentTypes = ["image", "video", "article", "audio", "posts"];
const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: tag }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});
