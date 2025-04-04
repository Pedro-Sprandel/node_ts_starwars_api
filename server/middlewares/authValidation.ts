import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const validateRegisterBody = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body) {return next(createHttpError(400, "Request body is missing"));}

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(createHttpError(400, "Missing required fields"));
  }
  next();
};

export const validateLoginBody = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body) {return next(createHttpError(400, "Request body is missing"));}

  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "Missing required fields"));
  }
  next();
};