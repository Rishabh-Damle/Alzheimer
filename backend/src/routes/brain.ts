import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { ContentModel, LinkModel } from "../db.js";
import { random } from "../utils.js";
export const brainRouter = Router();
brainRouter.use(express.json());
brainRouter.post("/share", userAuth, async (req, res) => {
  const { share } = req.body;
  if (share) {
    await LinkModel.create({
      userId: req.userId,
      hash: random(10),
    });
    res.status(201).json({
      message: "Your sharable link is successfully created.",
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });
    res.status(200).json({
      message: "Your link delete request was successful.",
    });
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
});
