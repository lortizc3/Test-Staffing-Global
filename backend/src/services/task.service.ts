import { StatusCodes } from 'http-status-codes';
import type { TaskPriority, TaskStatus } from '@prisma/client';
import { taskRepository } from '../repositories/task.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { ApiError } from '../utils/api-error.js';

const ensureAssignedUserExists = async (assignedToId: string) => {
  const assignedUser = await userRepository.findById(assignedToId);
  if (!assignedUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Assigned user does not exist');
  }
};

export const taskService = {
  async list(filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
    assignedToId?: string;
  }) {
    return taskRepository.list({
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.priority ? { priority: filters.priority } : {}),
      ...(filters.assignedToId ? { assignedToId: filters.assignedToId } : {}),
      ...(filters.search
        ? {
            title: {
              contains: filters.search,
            },
          }
        : {}),
    });
  },

  async getById(id: string) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
    }

    return task;
  },

  async create(input: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignedToId: string;
    createdById: string;
  }) {
    await ensureAssignedUserExists(input.assignedToId);
    return taskRepository.create(input);
  },

  async update(
    id: string,
    input: Partial<{
      title: string;
      description: string;
      status: TaskStatus;
      priority: TaskPriority;
      assignedToId: string;
    }>
  ) {
    await this.getById(id);
    if (input.assignedToId) {
      await ensureAssignedUserExists(input.assignedToId);
    }

    return taskRepository.update(id, input);
  },

  async updateStatus(id: string, status: TaskStatus) {
    await this.getById(id);
    return taskRepository.update(id, { status });
  },

  async remove(id: string) {
    await this.getById(id);
    await taskRepository.delete(id);
  },
};
