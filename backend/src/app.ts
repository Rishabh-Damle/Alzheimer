import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { contentRouter } from "./routes/content.js";
import { brainRouter } from "./routes/brain.js";
import { getConfig } from "./config.js";

const config = getConfig();
const FRONTEND_URL = config.FRONTEND_URL as string;

const app = express();

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

export default app;
