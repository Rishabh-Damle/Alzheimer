import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://Rishabh:Wyrat_Kohli_18@cluster0.akno4.mongodb.net/Alzheimer"
);
import { model, Schema } from "mongoose";
const UserSchmea = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchmea);
