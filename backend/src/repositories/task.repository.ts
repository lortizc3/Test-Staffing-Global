import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';

const taskInclude = {
  assignedTo: { select: { id: true, name: true, email: true, role: true } },
  createdBy: { select: { id: true, name: true, email: true, role: true } },
} satisfies Prisma.TaskInclude;

export const taskRepository = {
  list(where: Prisma.TaskWhereInput) {
    return prisma.task.findMany({
      where,
      include: taskInclude,
      orderBy: [{ status: 'asc' }, { priority: 'desc' }, { createdAt: 'desc' }],
    });
  },
  findById(id: string) {
    return prisma.task.findUnique({ where: { id }, include: taskInclude });
  },
  create(data: Prisma.TaskUncheckedCreateInput) {
    return prisma.task.create({ data, include: taskInclude });
  },
  update(id: string, data: Prisma.TaskUncheckedUpdateInput) {
    return prisma.task.update({ where: { id }, data, include: taskInclude });
  },
  delete(id: string) {
    return prisma.task.delete({ where: { id } });
  },
};
