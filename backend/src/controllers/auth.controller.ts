import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { authService } from '../services/auth.service.js';

export const authController = {
  async register(req: Request, res: Response) {
    const payload = registerSchema.parse(req.body);
    const result = await authService.register(payload);
    res.status(StatusCodes.CREATED).json(result);
  },

  async login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const result = await authService.login(payload);
    res.status(StatusCodes.OK).json(result);
  },

  async logout(_req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: 'Logout successful on client side' });
  },

  async me(req: Request, res: Response) {
    const user = await authService.me(req.auth!.userId);
    res.status(StatusCodes.OK).json(user);
  },
};
