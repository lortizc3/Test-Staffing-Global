import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/async-handler.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', asyncHandler(authController.register));
authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/logout', asyncHandler(authController.logout));
authRouter.get('/me', authMiddleware, asyncHandler(authController.me));
