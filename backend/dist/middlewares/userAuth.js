//override the types of the express request object avoid the use of @ts-ignore
import jwt from "jsonwebtoken";
import { getConfig } from "../config.js";
const config = getConfig();
const JWT_USER_PASSWORD = config.JWT_USER_PASSWORD;
export function userAuth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(404).json({ Error: `You are not loged-in` });
        return;
    }
    try {
        const decodedData = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decodedData.userId;
        console.log(decodedData);
        next();
    }
    catch (error) {
        res.json({ message: "Invalid credentials!" });
    }
}
