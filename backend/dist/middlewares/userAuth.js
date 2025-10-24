//override the types of the express request object avoid the use of @ts-ignore
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
export function userAuth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(404).json({ Error: `You are not loged-in` });
        return;
    }
    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.userId;
        console.log(decodedData);
        next();
    }
    catch (error) {
        res.json({ message: "Invalid credentials!" });
    }
}
