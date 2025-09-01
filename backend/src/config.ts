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

export function getConfig(): envConfig {
  return {
    DB_URL: getEnvVar("DB_URL"),
    JWT_USER_PASSWORD: getEnvVar("JWT_USER_PASSWORD"),
    PORT: getEnvVar("PORT"),
  };
}
