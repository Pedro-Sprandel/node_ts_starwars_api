import request from "supertest";
import app from "../app";

describe("Auth API", () => {
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

