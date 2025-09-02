import express from "express";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
export const contentRouter = Router();
contentRouter.use(express.json());

contentRouter.post("/createContent", userAuth, async (req, res) => {});
