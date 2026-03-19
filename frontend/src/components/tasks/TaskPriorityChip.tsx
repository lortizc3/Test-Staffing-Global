import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TaskPriority } from '../../types';

const colorMap: Record<TaskPriority, 'success' | 'warning' | 'error'> = {
  LOW: 'success',
  MEDIUM: 'warning',
  HIGH: 'error',
};

export function TaskPriorityChip({ priority }: { priority: TaskPriority }) {
  const { t } = useTranslation();

  return <Chip label={t(`tasks.priority.${priority}`)} color={colorMap[priority]} size="small" />;
}
