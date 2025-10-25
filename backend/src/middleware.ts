//override the types of the express request object avoid the use of @ts-ignore
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import { JWT_SECRET } from "./config.js";

interface myJwtPayLoad {
  userId: string;
}
export function userAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(404).json({ Error: `You are not loged-in` });
    return;
  }
  try {
    const decodedData = jwt.verify(token, JWT_SECRET) as myJwtPayLoad;
    req.userId = decodedData.userId;
    console.log(decodedData);
    next();
  } catch (error) {
    res.json({ message: "Invalid credentials!" });
  }
}
