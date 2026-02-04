import dotenv from "dotenv";
dotenv.config();
import mongoose, { Types } from "mongoose";

import { DB_URL } from "./config";

if (DB_URL) {
  mongoose
    .connect(DB_URL, {
      bufferCommands: false,
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error(
        "CRITICAL: Mongo connection error. Check your DB_URL and IP whitelist.",
      );
      console.error("Error details:", err.message);
    });
} else {
  console.error("DB_URL is not set in .env file.");
}
import { model, Schema } from "mongoose";
// Remove accidental zod imports; use Mongoose types instead

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
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});
export const LinkModel = model("Link", LinkSchema);
//content schema
const contentTypes = ["Youtube", "Twitter", "Test"];
const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, required: true, enum: contentTypes },
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
