import pkg from "pg";
import debug from "debug";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const log = debug("node_expr:server:src");

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432")
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    log("Error connecting to PostgreSQL:", err);
  } else {
    log("PostgreSQL connected successfully at:", res.rows[0].now);
  }
});

export default pool;