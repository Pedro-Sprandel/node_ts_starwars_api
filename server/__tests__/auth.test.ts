import debug from "debug";
import request from "supertest";
import app from "../app.ts";
import pool from "../src/db/pool.ts";

const log = debug("node_expr:server:__tests__");

beforeAll(async () => {
  await pool.query(`TRUNCATE TABLE ${process.env.DB_SCHEMA}.users RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  pool.removeAllListeners();
  await pool.end().catch((e: Error) => log("Error ending pool:", e));
}, 10000);

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should return 201", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "teste@teste.com",
          username: "Teste",
          password: "123321"
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
    });
    it("should return 400 for missing body", async () => {
      const response = await request(app)
        .post("/api/auth/register");

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("Request body is missing");
    });
    it("should return 400 for missing required fields", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: ""
      });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("Missing required fields");
    });
  }),
  describe("POST /api/auth/login", () => {
    it("should return 200", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "teste@teste.com",
          password: "123321"
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful");
    });

    it("should return 400 for missing required fields", async () => {
      const testCases = [
        {
          payload: { email: "" },
          expectedStatus: 400,
          expectedMessage: "Missing required fields"
        },
        {
          payload: { password: "" },
          expectedStatus: 400,
          expectedMessage: "Missing required fields"
        }
      ];

      for (const testCase of testCases) {
        const response = await request(app)
          .post("/api/auth/login")
          .send(testCase.payload);

        expect(response.status).toBe(testCase.expectedStatus);
        expect(response.body.error.message).toBe(testCase.expectedMessage);
      }
    });

    it("should return 401 for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login").send({
          email: "nao@existe.com",
          password: "senhaerrada"
        });

      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe("Invalid credentials");
    });

    it("should return 400 for missing body", async () => {
      const response = await request(app)
        .post("/api/auth/login");

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("Request body is missing");
    });
  });
});

