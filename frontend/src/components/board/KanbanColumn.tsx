import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from './TaskCard';

export function KanbanColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        p: 2,
        minHeight: 420,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FBFF 100%)',
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6">{t(`tasks.status.${status}`)}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('tasks.columnCount', { count: tasks.length })}
          </Typography>
        </Box>
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          <Stack spacing={1.5}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Stack>
        </SortableContext>
      </Stack>
    </Paper>
  );
}
