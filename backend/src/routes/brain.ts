import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { ContentModel, LinkModel, UserModel } from "../db.js";
import { random } from "../utils.js";
export const brainRouter = Router();
brainRouter.use(express.json());
brainRouter.post("/share", userAuth, async (req, res) => {
  const { share } = req.body;
  if (share) {
    //check whether the sharable link already exists or not
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });
    if (existingLink) {
      res.status(409).json({
        error: "Sharable link already exists",
        link: existingLink.hash,
      });
      return;
    }
    const hash = random(20);
    await LinkModel.create({
      userId: req.userId,
      hash: hash,
    });
    res.status(201).json({
      message: "Your sharable link is successfully created.",
      link: hash,
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });
    res.status(200).json({
      message: "Your link delete request was successful.",
    });
    return;
  }
});

brainRouter.get("/share/:shareLink", async (req, res) => {
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

  res.status(200).json({
    message: "Data fetched successfully",
    username: user?.username,
    content: content,
  });
});
