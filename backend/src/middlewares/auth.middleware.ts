import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyAccessToken } from '../utils/jwt.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = verifyAccessToken(token);
    req.auth = { userId: payload.userId, role: payload.role };
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
