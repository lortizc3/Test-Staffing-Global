import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';

export const taskRouter = Router();

taskRouter.use(authMiddleware);
taskRouter.get('/', asyncHandler(taskController.list));
taskRouter.post('/', asyncHandler(taskController.create));
taskRouter.get('/:id', asyncHandler(taskController.getById));
taskRouter.put('/:id', asyncHandler(taskController.update));
taskRouter.patch('/:id/status', asyncHandler(taskController.updateStatus));
taskRouter.delete('/:id', asyncHandler(taskController.remove));
