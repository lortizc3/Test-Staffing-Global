import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { ApiError } from '../utils/api-error.js';

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Validation error',
      issues: error.flatten(),
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};
