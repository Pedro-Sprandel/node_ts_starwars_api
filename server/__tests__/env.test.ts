import { getEnvFile } from "../utils/env.ts";

describe("get correct .env file", () => {
  it("should return .env when production", () => {
    process.env.NODE_ENV = "production";
    const envFile = getEnvFile();
    expect(envFile).toBe(".env");
  });

  it("should return .env.development.local when development", () => {
    process.env.NODE_ENV = "development";
    const envFile = getEnvFile();
    expect(envFile).toBe(".env.development.local");
  });

  it("should return .env.test.local when env = jest", () => {
    process.env.NODE_ENV = "jest";
    const envFile = getEnvFile();
    expect(envFile).toBe(".env.test.local");
  });
});