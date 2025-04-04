import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import debug from "debug";
import { createUser, getUserWithPasswordByEmail } from "../repository/userRepository.ts";
import { comparePassword, hashPassword } from "../services/hashPassword.ts";
import { generateToken } from "../services/jwt.ts";
import { setAuthCookie } from "../utils/cookie.ts";

const log = debug("node_expr:server:controllers:auth");

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const user = await createUser(username, email, hashedPassword);

    res.status(201).json({user: user});
  } catch (err) {
    log(err);
    next(err);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await getUserWithPasswordByEmail(email);

    if(!user || !(await comparePassword(password, user.password))) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const token = generateToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);

    res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email } });
  } catch (err) {
    log(err);
    next(err);
  }
};