//you can inforce your codebase should not have any ts-ignores
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = "Hi_Baby";
import { UserModel } from "./db.js";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
  //add zod validations,add password hashing,use try catch and etc more great things
  const username = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User signedup",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});
app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );
    res.status(203).json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});
app.post("/api/v1/content", async (req, res) => {});
app.get("/api/v1/content", async (req, res) => {});
app.delete("/api/v1/content", async (req, res) => {});
app.post("/api/v1/brain/share", async (req, res) => {});
app.get("/api/v1/brain/:shareLink", async (req, res) => {});

app.listen(3000);
