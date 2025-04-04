import dotenv from "dotenv";
import { getEnvFile } from "./utils/env.ts";
dotenv.config({ path: getEnvFile() });
import express from "express";
import routes from "./routes/index.ts";
import cookieParser from "cookie-parser";
import { handleError, handleNotFound } from "./controllers/appController.ts";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", routes);
app.use(handleNotFound);
app.use(handleError);

export default app;
