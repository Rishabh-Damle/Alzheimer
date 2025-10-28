//you can inforce your codebase should not have any ts-ignores
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { UserModel, ContentModel, LinkModel } from "./db.js";
import cors from "cors";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userAuth } from "./middleware.js";
import { random } from "./utils.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

//configure cors
// Normalize Vercel API base path so Express routes match whether invoked at / or /api/*
app.use((req, _res, next) => {
  if (req.url === "/api" || req.url === "/api/") {
    req.url = "/";
  } else if (req.url.startsWith("/api/")) {
    req.url = req.url.slice(4);
  }
  next();
});
const allowedOrigins = [
  FRONTEND_URL,
  "https://alzheimer-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean) as string[];

const corsOptions: cors.CorsOptions = {
  // Reflect request origin dynamically to simplify CORS in serverless
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 204,
  preflightContinue: false,
  credentials: true,
};

app.use(cors(corsOptions));
// Ensure CORS headers exist on all responses when origin is allowed
app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
});
// Explicit OPTIONS handler compatible with Express 5's path parser
app.options(/.*/, (req, res) => {
  const origin = req.headers.origin as string | undefined;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );
  const requestHeaders =
    (req.headers["access-control-request-headers"] as string | undefined) ??
    "Content-Type, Authorization, Accept, X-Requested-With";
  res.header("Access-Control-Allow-Headers", requestHeaders);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400");
  res.status(200).end();
});
// Generic preflight handler without path patterns to avoid path-to-regexp issues
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin as string | undefined;
    if (!origin || allowedOrigins.includes(origin)) {
      res.header(
        "Access-Control-Allow-Origin",
        origin ?? allowedOrigins[0] ?? "*"
      );
    }
    res.header("Vary", "Origin");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS,PATCH"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept, X-Requested-With"
    );
    res.status(200).end();
    return;
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  res.status(200).json({ ok: true });
});
// ignore favicon requests to avoid noise/crashes
app.get(["/favicon.ico", "/favicon.png"], (_req, res) => {
  res.sendStatus(204);
});
app.post("/v1/signup", async (req, res) => {
  //add zod validations,add password hashing,use try catch and etc more great things
  const { username, password } = req.body;

  // if (!username || !password) {
  //   res.status(404).json({
  //     Error: `please add all the credentials that all are neccsesarry`,
  //   });
  //   return;
  // }

  const requiredBody = z.object({
    username: z.string().min(5).max(100),
    password: z
      .string()
      .min(8)
      .max(16)
      .regex(/[A-Z]/, "Must contain atleast one upercase later")
      .regex(/[a-z]/, "Must contain atleast one lowercase later")
      .regex(/[#?!@$%^&*-]/, "Must contain atleast one special character"),
  });
  const parsedDataWithSuccsess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccsess.success) {
    res.status(404).json({
      Message: `Bad format to enter please make sure you are using right format`,
      Error: parsedDataWithSuccsess.error,
    });
    return;
  }
  const hasshedPassword = await bcrypt.hash(password, 10);
  try {
    await UserModel.create({
      username: username,
      password: hasshedPassword,
    });

    res.json({
      message: "User signedup",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});
app.post("/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      Error: `please add all the credentials sir that all are neccsesarry`,
    });
    return;
  }
  const existingUser = await UserModel.findOne({
    username,
  });

  if (!existingUser || !existingUser.password) {
    return res
      .status(404)
      .json({ Error: "You are not signed up or password is missing" });
  }
  const passwordmatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordmatch) {
    res.status(404).json({ Error: `you have a wrong password` });
    return;
  }

  const token = jwt.sign({ userId: existingUser._id.toString() }, JWT_SECRET);
  console.log("Backend token " + token);
  res.status(200).json({ Token: token });
});
app.post("/v1/createYourContent", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { link, type, title } = req.body;

    //checking whether user given all the fields or not
    if (!link || !type || !title) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const content = await ContentModel.create({
      link: link,
      type: type,
      title: title,
      userId: userId,
    });

    console.log(content);
    if (content) {
      res.status(200).json({
        message: "Content saved Successfully",
        content,
      });
    }

    return;
  } catch (error) {
    console.log("Err(catch): something went wrong", error);
    return;
  }
});
app.get("/v1/getYourContent", userAuth, async (req, res) => {
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

  res.status(200).json({ Message: "Take your content", content });
  console.log(content);
});
app.delete("/v1/deleteYourContent", userAuth, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    _id: contentId,
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    message: "Content deleted",
  });
});
app.post("/v1/share", userAuth, async (req, res) => {
  const { share } = req.body;
  if (share) {
    //check whether the sharable link already exists or not
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(8);
    console.log("Generated hash:", hash);
    await LinkModel.create({
      userId: req.userId,
      hash: hash,
    });
    res.status(201).json({
      message: "Your sharable link is successfully created.",
      link: hash,
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });
    res.status(200).json({
      message: "Your link delete request was successful.",
    });
    return;
  }
});
app.get("/v1/share/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash: hash,
  });
  if (!link) {
    res.status(404).json({
      message: "Resource not found.",
    });
    return;
  }
  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "User not found , error should ideally not happen",
    });
    return;
  }

  res.status(200).json({
    message: "Data fetched successfully",
    username: user?.username,
    content: content,
  });
});

export default app;
// central error handler to prevent crashes
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);
