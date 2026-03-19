import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardActionArea, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../../types';
import { TaskPriorityChip } from '../tasks/TaskPriorityChip';
import { TaskStatusChip } from '../tasks/TaskStatusChip';

export function TaskCard({ task }: { task: Task }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      sx={{ cursor: 'grab' }}
    >
      <CardActionArea onClick={() => navigate(`/app/tasks/${task.id}`)}>
        <CardContent>
          <Stack spacing={1.25}>
            <Typography fontWeight={800}>{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <TaskPriorityChip priority={task.priority} />
              <TaskStatusChip status={task.status} />
            </Stack>
            <Divider />
            <Typography variant="caption" color="text.secondary">
              {t('tasks.assignedTo', { name: task.assignedTo.name })}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
