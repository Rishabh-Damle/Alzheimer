type envConfig = {
  DB_URL: string;
  JWT_USER_PASSWORD: string;
  PORT: string;
};

function getEnvVar(key: keyof envConfig): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config: envConfig = {
  DB_URL: getEnvVar("DB_URL"),
  JWT_USER_PASSWORD: getEnvVar("JWT_USER_PASSWORD"),
  PORT: getEnvVar("PORT"),
};
// export const DB_URL: String | undefined = process.env.DB_URL;
// export const JWT_USER_PASSWORD: String | undefined =
//   process.env.JWT_USER_PASSWORD;
