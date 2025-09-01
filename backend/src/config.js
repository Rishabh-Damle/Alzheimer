"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
function getEnvVar(key) {
    var value = process.env[key];
    if (!value) {
        throw new Error("Missing required environment variable: ".concat(key));
    }
    return value;
}
exports.config = {
    DB_URL: getEnvVar("DB_URL"),
    JWT_USER_PASSWORD: getEnvVar("JWT_USER_PASSWORD"),
    PORT: getEnvVar("PORT"),
};
