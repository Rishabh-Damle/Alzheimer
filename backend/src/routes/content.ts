import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userMiddleware";
import { ContentModel, LinkModel, UserModel } from "../db";
import { random } from "../utils";
export const contentRouter = Router();
contentRouter.use(express.json());
contentRouter.post("/createYourContent", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { link, type, title } = req.body;

    //checking whether user given all the fields or not
    if (!link || !type || !title) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const content = await ContentModel.create({
      link: link,
      type: type,
      title: title,
      userId: userId,
    });

    console.log(content);
    if (content) {
      res.status(200).json({
        message: "Content saved Successfully",
        content,
      });
    }

    return;
  } catch (error) {
    console.log("Err(catch): something went wrong", error);
    return;
  }
});
contentRouter.get("/getYourContent", userAuth, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate({
    path: "userId",
    select: "username",
  });
  if (!content) {
    res.status(404).json({
      Error: `not found your any contents`,
    });
    return;
  }

  res.status(200).json({ Message: "Take your content", content });
  console.log(content);
});
contentRouter.delete("/deleteYourContent", userAuth, async (req, res) => {
  const { contentId } = req.params;
  console.log("contentId" + contentId);
  await ContentModel.deleteMany({
    contentId: contentId,
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    message: "Content deleted",
  });
});
contentRouter.get("/share", userAuth, async (req, res) => {
  const existingLink = await LinkModel.findOne({ userId: req.userId });
  if (!existingLink) {
    res.status(200).json({ hash: null });
    return;
  }
  res.status(200).json({ hash: existingLink.hash });
});

contentRouter.post("/shareYourContent", userAuth, async (req, res) => {
  const { share } = req.body as { share?: boolean };
  if (share) {
    const existingLink = await LinkModel.findOne({ userId: req.userId });
    if (existingLink) {
      res.status(200).json({ hash: existingLink.hash });
      return;
    }
    const hash = random(8);
    await LinkModel.create({ userId: req.userId, hash });
    res.status(201).json({ hash });
    return;
  }
  await LinkModel.deleteOne({ userId: req.userId });
  res.status(200).json({ hash: null });
});
contentRouter.get("/share/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash: hash,
  });
  if (!link) {
    res.status(404).json({
      message: "Resource not found.",
    });
    return;
  }
  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "User not found , error should ideally not happen",
    });
    return;
  }

  res.status(200).json({
    message: "Data fetched successfully",
    username: user?.username,
    content: content,
  });
});
