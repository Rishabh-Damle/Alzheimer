"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const index_js_1 = __importDefault(require("../index.js"));
exports.default = (0, serverless_express_1.default)({ app: index_js_1.default });
