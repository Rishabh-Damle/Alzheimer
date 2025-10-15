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
import { string } from "zod";

//user schema
const UserSchmea = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchmea);
//TagSchema
const TagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});
export const TagModel = model("Tag", TagSchema);

const LinkSchema = new Schema({
  hash: { type: string, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});
export const LinkModel = model("Link", LinkSchema);
//content schema
const contentTypes = [
  "image",
  "video",
  "article",
  "audio",
  "post",
  "Youtube",
  "Twitter",
];
const ContentSchema = new Schema({
  link: { type: String, ref: "Link", required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ContentSchema.pre("save", async function (next) {
  const user = await UserModel.findById(this.userId);
  if (!user) {
    throw new Error("User does not exist");
  }
  next();
});

export const ContentModel = model("Content", ContentSchema);
