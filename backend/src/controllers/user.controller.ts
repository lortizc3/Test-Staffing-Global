import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../repositories/user.repository.js';

export const userController = {
  async list(_req: Request, res: Response) {
    const users = await userRepository.listAll();
    res.status(StatusCodes.OK).json(users);
  },
};
