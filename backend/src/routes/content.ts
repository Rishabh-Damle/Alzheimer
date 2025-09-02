import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { ContentModel } from "../db.js";
import { TagModel } from "../db.js";
export const contentRouter = Router();
contentRouter.use(express.json());

contentRouter.post("/createContent", userAuth, async (req, res) => {
  const userId = req.userId;
  const { link, type, title, tag } = req.body;
  const content = await ContentModel.create({
    link: link,
    type: type,
    title: title,
    userId: userId,
  });

  res.status(200).json({
    Message: `Your content is added succsesfully`,
    contentId: content._id,
  });
});
