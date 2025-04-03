import express from "express";
import routes from "./routes/index.ts";
import { handleError, handleNotFound } from "./controllers/app.ts";
import pool from "./src/db.ts";

const app = express();
pool.connect();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(handleNotFound);
app.use(handleError);

export default app;