import debug from "debug";
import pkg from "pg";

const { Pool } = pkg;

const log = debug("node_expr:server:src");

const requiredEnvVars = ["DB_USER", "DB_NAME", "DB_PASSWORD", "DB_HOST"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432")
});

const schema = process.env.DB_SCHEMA || "grimoire_test";

pool.on("connect", (client) => {
  client.query(`SET search_path TO ${schema}`, (err) => {
    if (err) {
      log("Error setting search_path:", err);
    } else {
      log(`Search path set to schema: ${schema}`);
    }
  });
});

pool.on("error", (err) => {
  log("Unexpected error on idle client", err);
});

export default pool;