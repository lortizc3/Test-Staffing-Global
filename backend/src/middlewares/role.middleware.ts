import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Role } from '@prisma/client';

export const roleMiddleware = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !allowedRoles.includes(req.auth.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
    }

    return next();
  };
};
