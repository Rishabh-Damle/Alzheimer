import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
export const userRouter = Router();
userRouter.use(express.json());
userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json({
      Error: `please add all the credentials that all are neccsesarry`,
    });
    return;
  }

  const requiredBody = z.object({
    username: z.string().min(5).max(100),
    password: z
      .string()
      .min(8)
      .max(16)
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[#?!@$%^&*-]/, "Must contain at least one special character"),
  });
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.status(400).json({
      Message: `Invalid format. Please checking your input.`,
      Error: parsedDataWithSuccess.error,
    });
    return;
  }
  const hasshedPassword = await bcrypt.hash(password, 10);
  try {
    await UserModel.create({
      username: username,
      password: hasshedPassword,
    });

    res.status(200).json({
      message: "User signedup",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "User already exists",
      });
    } else {
      console.error("Signup error:", error);
      res.status(500).json({
        message: "Internal server error during signup",
        details: error.message,
      });
    }
  }
});
userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      Error: `Please provide all necessary credentials`,
    });
    return;
  }
  const existingUser = await UserModel.findOne({
    username,
  });

  if (!existingUser || !existingUser.password) {
    return res
      .status(401)
      .json({ Error: "User not found or password missing" });
  }
  const passwordmatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordmatch) {
    res.status(401).json({ Error: `Invalid password` });
    return;
  }

  const token = jwt.sign({ userId: existingUser._id.toString() }, JWT_SECRET);
  console.log("Backend token " + token);
  res.status(200).json({ Token: token });
});
