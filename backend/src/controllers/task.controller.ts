import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createTaskSchema, taskFiltersSchema, updateTaskSchema, updateTaskStatusSchema } from '../schemas/task.schema.js';
import { taskService } from '../services/task.service.js';

type TaskParams = { id: string };

export const taskController = {
  async list(req: Request, res: Response) {
    const filters = taskFiltersSchema.parse(req.query);
    const tasks = await taskService.list(filters);
    res.status(StatusCodes.OK).json(tasks);
  },

  async getById(req: Request<TaskParams>, res: Response) {
    const task = await taskService.getById(req.params.id);
    res.status(StatusCodes.OK).json(task);
  },

  async create(req: Request, res: Response) {
    const payload = createTaskSchema.parse(req.body);
    const task = await taskService.create({ ...payload, createdById: req.auth!.userId });
    res.status(StatusCodes.CREATED).json(task);
  },

  async update(req: Request<TaskParams>, res: Response) {
    const payload = updateTaskSchema.parse(req.body);
    const task = await taskService.update(req.params.id, payload);
    res.status(StatusCodes.OK).json(task);
  },

  async updateStatus(req: Request<TaskParams>, res: Response) {
    const payload = updateTaskStatusSchema.parse(req.body);
    const task = await taskService.updateStatus(req.params.id, payload.status);
    res.status(StatusCodes.OK).json(task);
  },

  async remove(req: Request<TaskParams>, res: Response) {
    await taskService.remove(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  },
};
