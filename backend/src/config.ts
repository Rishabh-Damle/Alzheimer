import dotenv from "dotenv";
dotenv.config();

export const DB_URL = process.env.DB_URL as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
