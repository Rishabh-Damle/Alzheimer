"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//you can inforce your codebase should not have any ts-ignores
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./db.js");
const config_js_1 = require("./config.js");
const cors_1 = __importDefault(require("cors"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_2 = require("./config.js");
const middleware_js_1 = require("./middleware.js");
const utils_js_1 = require("./utils.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//configure cors
const corsOptions = {
    origin: config_js_1.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    const hasshedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield db_js_1.UserModel.create({
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
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).json({
            Error: `please add all the credentials sir that all are neccsesarry`,
        });
        return;
    }
    const existingUser = yield db_js_1.UserModel.findOne({
        username,
    });
    if (!existingUser || !existingUser.password) {
        return res
            .status(404)
            .json({ Error: "You are not signed up or password is missing" });
    }
    const passwordmatch = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!passwordmatch) {
        res.status(404).json({ Error: `you have a wrong password` });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: existingUser._id.toString() }, config_js_2.JWT_SECRET);
    console.log("Backend token " + token);
    res.status(200).json({ Token: token });
}));
app.post("/createYourContent", middleware_js_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { link, type, title } = req.body;
        //checking whether user given all the fields or not
        if (!link || !type || !title) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const content = yield db_js_1.ContentModel.create({
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
}));
app.get("/getYourContent", middleware_js_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_js_1.ContentModel.find({
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
}));
app.delete("/deleteYourContent", middleware_js_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_js_1.ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId,
    });
    res.json({
        message: "Content deleted",
    });
}));
app.post("/share", middleware_js_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        //check whether the sharable link already exists or not
        const existingLink = yield db_js_1.LinkModel.findOne({
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
        yield db_js_1.LinkModel.create({
            userId: req.userId,
            hash: hash,
        });
        res.status(201).json({
            message: "Your sharable link is successfully created.",
            link: hash,
        });
    }
    else {
        yield db_js_1.LinkModel.deleteOne({
            userId: req.userId,
        });
        res.status(200).json({
            message: "Your link delete request was successful.",
        });
        return;
    }
}));
app.get("/share/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_js_1.LinkModel.findOne({
        hash: hash,
    });
    if (!link) {
        res.status(404).json({
            message: "Resource not found.",
        });
        return;
    }
    const content = yield db_js_1.ContentModel.find({
        userId: link.userId,
    });
    const user = yield db_js_1.UserModel.findOne({
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
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content,
    });
}));
exports.default = app;
