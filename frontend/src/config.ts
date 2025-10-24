import dotenv from "dotenv";
dotenv.config();
export const BACKEND_URL = process.env.BACKEND_URL as string;
export const SITE_URL = `${window.location.protocol}//${window.location.host}`;
