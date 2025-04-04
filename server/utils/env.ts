import dotenv from "dotenv";

export const getEnvFile = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "production"
    ? ".env"
    : env === "test"
      ? ".env.test"
      : env === "development"
        ? ".env.development.local"
        :  env === "jest" ? ".env.test.local" : ".env.local";
};

dotenv.config({path: getEnvFile()});