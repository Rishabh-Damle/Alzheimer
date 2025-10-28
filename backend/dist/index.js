"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//you can inforce your codebase should not have any ts-ignores
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./db.js");
const cors_1 = __importDefault(require("cors"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("./config.js");
const middleware_js_1 = require("./middleware.js");
const utils_js_1 = require("./utils.js");
const config_js_2 = require("./config.js");
const app = (0, express_1.default)();
//configure cors
const corsOptions = {
    origin: config_js_2.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", config_js_2.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});
app.use(express_1.default.json());
app.post("/api/v1/signup", async (req, res) => {
    //add zod validations,add password hashing,use try catch and etc more great things
    const { username, password } = req.body;
    // if (!username || !password) {
    //   res.status(404).json({
    //     Error: `please add all the credentials that all are neccsesarry`,
    //   });
    //   return;
    // }
    const requiredBody = zod_1.default.object({
        username: zod_1.default.string().min(5).max(100),
        password: zod_1.default
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
    const hasshedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        await db_js_1.UserModel.create({
            username: username,
            password: hasshedPassword,
        });
        res.json({
            message: "User signedup",
        });
    }
    catch (error) {
        res.status(411).json({
            message: "User already exists",
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            Error: `please add all the credentials sir that all are neccsesarry`,
        });
        return;
    }
    const existingUser = await db_js_1.UserModel.findOne({
        username,
    });
    if (!existingUser || !existingUser.password) {
        return res
            .status(404)
            .json({ Error: "You are not signed up or password is missing" });
    }
    const passwordmatch = await bcrypt_1.default.compare(password, existingUser.password);
    if (!passwordmatch) {
        res.status(404).json({ Error: `you have a wrong password` });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: existingUser._id.toString() }, config_js_1.JWT_SECRET);
    console.log("Backend token " + token);
    res.status(200).json({ Token: token });
});
app.post("/api/v1/createYourContent", middleware_js_1.userAuth, async (req, res) => {
    try {
        const userId = req.userId;
        const { link, type, title } = req.body;
        //checking whether user given all the fields or not
        if (!link || !type || !title) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const content = await db_js_1.ContentModel.create({
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
    }
    catch (error) {
        console.log("Err(catch): something went wrong", error);
        return;
    }
});
app.get("/api/v1/getYourContent", middleware_js_1.userAuth, async (req, res) => {
    const userId = req.userId;
    const content = await db_js_1.ContentModel.find({
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
app.delete("/api/v1/deleteYourContent", middleware_js_1.userAuth, async (req, res) => {
    const contentId = req.body.contentId;
    await db_js_1.ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId,
    });
    res.json({
        message: "Content deleted",
    });
});
app.post("/api/v1/share", middleware_js_1.userAuth, async (req, res) => {
    const { share } = req.body;
    if (share) {
        //check whether the sharable link already exists or not
        const existingLink = await db_js_1.LinkModel.findOne({
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
            });
            return;
        }
        const hash = (0, utils_js_1.random)(8);
        console.log("Generated hash:", hash);
        await db_js_1.LinkModel.create({
            userId: req.userId,
            hash: hash,
        });
        res.status(201).json({
            message: "Your sharable link is successfully created.",
            link: hash,
        });
    }
    else {
        await db_js_1.LinkModel.deleteOne({
            userId: req.userId,
        });
        res.status(200).json({
            message: "Your link delete request was successful.",
        });
        return;
    }
});
app.get("/api/v1/share/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_js_1.LinkModel.findOne({
        hash: hash,
    });
    if (!link) {
        res.status(404).json({
            message: "Resource not found.",
        });
        return;
    }
    const content = await db_js_1.ContentModel.find({
        userId: link.userId,
    });
    const user = await db_js_1.UserModel.findOne({
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
exports.default = app;
