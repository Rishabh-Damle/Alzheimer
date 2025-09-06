import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { ContentModel, LinkModel } from "../db.js";
import crypto from "crypto";
export const brainRouter = Router();
brainRouter.use(express.json());
brainRouter.put("/share", userAuth, async (req, res) => {
  const userId = req.userId;
  const { permission } = req.body;
  const contents = await ContentModel.find({
    userId: userId,
  });
  if (!contents) {
    return res.status(404).json({
      Messagse: "Not found any contents or these are not yours",
    });
  }
  if (!permission) {
    return res.status(400).json({
      Message: "Permision must be granted to generate a link ",
    });
  }
  const hash = crypto.randomBytes(6).toString("hex");
  const linkUpdated = await LinkModel.updateMany(
    { userId: userId },
    {
      $set: {
        permission: true,
      },
    }
  );
  if (!linkUpdated) {
    return res.status(404).json({
      Messsage: "Permision is not updated for some reason",
    });
  }
  res.status(200).json({
    message: "Link created successfully",
    link: `/access/${hash}`,
    userId: userId,
  });
});

brainRouter.get("/share/access/:hash", async (req, res) => {
  const { userId } = req.body;
  const contents = await ContentModel.find({ userId: userId }).populate({
    path: "userId",
    select: "username",
  });
  if (!contents) {
    res.status(404).json({
      Error: "Invalid or expired link",
    });
  }
  res.status(200).json({
    message: "Here is the shared content",
    content: contents,
  });
});
