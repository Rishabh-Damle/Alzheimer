import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { ContentModel, TagModel, LinkModel } from "../db.js";
export const contentRouter = Router();
contentRouter.use(express.json());

contentRouter.post("/createYourContent", userAuth, async (req, res) => {
  const userId = req.userId;
  const { link, type, title } = req.body;
  let Link = await LinkModel.findOne({
    link: link,
  });

  if (!Link) {
    Link = await LinkModel.create({
      link: link,
      userId: userId,
    });
  }

  let Tag = await TagModel.findOne({
    title: title,
  });
  if (!Tag) {
    Tag = await TagModel.create({
      title: title,
    });
  }

  const content = await ContentModel.create({
    link: Link._id,
    type: type,
    title: title,
    tag: Tag._id,
    userId: userId,
  });

  res.status(200).json({
    Message: `Your content is added succsesfully`,
    contentId: content._id,
  });
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

  res.status(200).json({ Message: "Take your content", Content: content });
});

contentRouter.delete("/deleteYourContent", userAuth, async (req, res) => {
  const userId = req.userId;
  const { contentId } = req.body;
  console.log("contentId: " + contentId);
  console.log("userId" + userId);
  const contentForDelete = await ContentModel.findOne({
    userId: userId,
    _id: contentId,
  });
  if (!contentForDelete) {
    res.status(404).json({ Error: `Your content is not found` });
    return;
  }
  await ContentModel.deleteOne({
    userId: userId,
    _id: contentId,
  });
  res.status(200).json({ Message: `Your selected content has been deleted` });
});
