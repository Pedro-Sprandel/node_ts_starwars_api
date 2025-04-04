import pool from "../src/db.ts";
import type User from "../types/user.ts";
import { DuplicateUserError, InsertFailedError } from "../errors/index.ts";

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string
): Promise<User> => {
  const checkQuery = "SELECT * FROM users WHERE username = $1 OR email = $2";
  const insertQuery = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *";
  const values = [username, email, hashedPassword];

  const checkResult = await pool.query(checkQuery, [username, email]);
  if (checkResult.rows.length > 0) {
    throw new DuplicateUserError();
  }

  const result = await pool.query(insertQuery, values);

  if (result.rows.length === 0) {
    throw new InsertFailedError();
  }

  return result.rows[0] as User;
};

export const getUserWithPasswordByEmail = async (email: string) => {
  const result = await pool.query<User>(
    "SELECT id, username, email, password_hash FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};