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
exports.ContentModel = exports.LinkModel = exports.TagModel = exports.UserModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
mongoose_1.default.connect(config_js_1.DB_URL);
const mongoose_2 = require("mongoose");
const zod_1 = require("zod");
//user schema
const UserSchmea = new mongoose_2.Schema({
    username: { type: String, unique: true },
    password: String,
});
exports.UserModel = (0, mongoose_2.model)("User", UserSchmea);
//TagSchema
const TagSchema = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true },
});
exports.TagModel = (0, mongoose_2.model)("Tag", TagSchema);
const LinkSchema = new mongoose_2.Schema({
    hash: { type: zod_1.string, required: true },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
});
exports.LinkModel = (0, mongoose_2.model)("Link", LinkSchema);
//content schema
const contentTypes = ["Youtube", "Twitter"];
const ContentSchema = new mongoose_2.Schema({
    link: { type: String, ref: "Link", required: true },
    type: { type: String, require: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
ContentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.UserModel.findById(this.userId);
        if (!user) {
            throw new Error("User does not exist");
        }
        next();
    });
});
exports.ContentModel = (0, mongoose_2.model)("Content", ContentSchema);
