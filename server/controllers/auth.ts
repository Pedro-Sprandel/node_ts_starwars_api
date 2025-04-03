import { Request, Response } from "express";
import pool from "../src/db";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await pool.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword]
  );
  res.json(user.rows[0]);
};