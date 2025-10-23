function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
export function getConfig() {
    return {
        DB_URL: getEnvVar("DB_URL"),
        JWT_USER_PASSWORD: getEnvVar("JWT_USER_PASSWORD"),
        PORT: getEnvVar("PORT"),
        FRONTEND_URL: getEnvVar("FRONTEND_URL"),
    };
}
