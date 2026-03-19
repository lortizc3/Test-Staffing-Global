import { closestCorners, DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Grid2 } from '@mui/material';
import { useMemo } from 'react';
import { tasksApi } from '../../api/tasks.api';
import type { Task, TaskStatus } from '../../types';
import { KanbanColumn } from './KanbanColumn';

const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

export function KanbanBoard({ tasks, onTaskUpdated }: { tasks: Task[]; onTaskUpdated: () => Promise<void> }) {
  const tasksByStatus = useMemo(
    () => ({
      TODO: tasks.filter((task) => task.status === 'TODO'),
      IN_PROGRESS: tasks.filter((task) => task.status === 'IN_PROGRESS'),
      DONE: tasks.filter((task) => task.status === 'DONE'),
    }),
    [tasks]
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const taskId = String(event.active.id);
    const targetId = event.over?.id;
    if (!targetId) return;

    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    const nextStatus = statuses.find(
      (status) => status === targetId || tasksByStatus[status].some((item) => item.id === targetId)
    );

    if (!nextStatus || nextStatus === task.status) return;

    await tasksApi.updateStatus(task.id, nextStatus);
    await onTaskUpdated();
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <Grid2 container spacing={2}>
        {statuses.map((status) => (
          <Grid2 key={status} size={{ xs: 12, md: 4 }} id={status}>
            <KanbanColumn status={status} tasks={tasksByStatus[status]} />
          </Grid2>
        ))}
      </Grid2>
    </DndContext>
  );
}
