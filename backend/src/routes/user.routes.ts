import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { asyncHandler } from '../utils/async-handler.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const userRouter = Router();

userRouter.get('/', authMiddleware, asyncHandler(userController.list));
