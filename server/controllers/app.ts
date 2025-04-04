import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  status?: number;
};

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err: CustomError = new Error("Página não encontrada");
  err.status = 404;
  next(err);
};

export const handleError = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
};