import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { ContentModel, TagModel, LinkModel } from "../db.js";
import mongoose from "mongoose";
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
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    _id: contentId,
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    message: "Content deleted",
  });
});
