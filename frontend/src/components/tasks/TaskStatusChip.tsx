import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TaskStatus } from '../../types';

const colorMap: Record<TaskStatus, 'default' | 'info' | 'success'> = {
  TODO: 'default',
  IN_PROGRESS: 'info',
  DONE: 'success',
};

export function TaskStatusChip({ status }: { status: TaskStatus }) {
  const { t } = useTranslation();

  return <Chip label={t(`tasks.status.${status}`)} color={colorMap[status]} size="small" />;
}
