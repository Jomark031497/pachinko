import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";
import { AppError } from "../utils/errors.js";

export const errorHandler = (error: AppError | Error, _req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    next();
    return;
  }

  logger.error({
    message: error.message,
    stack: error.stack,
    ...(error instanceof AppError ? { statusCode: error.statusCode, errors: error.errors } : {}),
  });

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors || null,
    });

    return;
  }

  res.status(500).json({
    message: "Something went wrong",
  });
};
