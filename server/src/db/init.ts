import pool from "./pool.ts";

const schema = process.env.DB_SCHEMA || "grimoire_test";

export async function initializeDatabase() {
  await pool.query(`SET search_path TO ${schema}`);
  console.log(await pool.query("SELECT * from users"));
}