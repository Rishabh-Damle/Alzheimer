import express from "express";
import { Router } from "express";
import { UserModel } from "../db.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { getConfig } from "../config.js";
const config = getConfig();
const JWT_USER_PASSWORD = config.JWT_USER_PASSWORD;
import bcrypt from "bcrypt";
export const userRouter = Router();
userRouter.use(express.json());
userRouter.post("/signup", async (req, res) => {
  //add zod validations,add password hashing,use try catch and etc more great things
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
      .regex(/[A-Z]/, "Must contain atleast one upercase later")
      .regex(/[a-z]/, "Must contain atleast one lowercase later")
      .regex(/[#?!@$%^&*-]/, "Must contain atleast one special character"),
  });
  const parsedDataWithSuccsess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccsess.success) {
    res.status(404).json({
      Message: `Bad format to enter please make sure you are using right format`,
      Error: parsedDataWithSuccsess.error,
    });
  }
  const hasshedPassword = await bcrypt.hash(password, 10);
  try {
    await UserModel.create({
      username: username,
      password: hasshedPassword,
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

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({
      Error: `please add all the credentials sir that all are neccsesarry`,
    });
    return;
  }
  const existingUser = await UserModel.findOne({
    username,
  });

  if (!existingUser || !existingUser.password) {
    return res
      .status(404)
      .json({ Error: "You are not signed up or password is missing" });
  }
  const passwordmatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordmatch) {
    res.status(404).json({ Error: `you have a wrong password` });
    return;
  }

  const token = jwt.sign(
    { userId: existingUser._id.toString() },
    JWT_USER_PASSWORD
  );
  res.status(200).json({ Token: token });
});
