//override the types of the express request object avoid the use of @ts-ignore
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { getConfig } from "../config.js";
const config = getConfig();
const JWT_USER_PASSWORD = config.JWT_USER_PASSWORD;
interface myJwtPayLoad {
  userId: string;
}
export function userAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(404).json({ Error: `Token is missing` });
    return;
  }
  try {
    const decodedData = jwt.verify(token, JWT_USER_PASSWORD) as myJwtPayLoad;
    req.userId = decodedData.userId;
    console.log(decodedData);
    next();
  } catch (error) {
    res.json({ message: "Invalid token!" });
  }
}
