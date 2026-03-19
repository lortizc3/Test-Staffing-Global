import { z } from 'zod';

export const taskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
export const taskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const taskFiltersSchema = z.object({
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  search: z.string().trim().optional(),
  assignedToId: z.string().trim().optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(5).max(1000),
  status: taskStatusSchema.default('TODO'),
  priority: taskPrioritySchema.default('MEDIUM'),
  assignedToId: z.string().min(1),
});

export const updateTaskSchema = createTaskSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'At least one field is required'
);

export const updateTaskStatusSchema = z.object({
  status: taskStatusSchema,
});
