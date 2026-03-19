import { Card, CardContent, Grid2, MenuItem, TextField } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TaskFilters as TaskFiltersValue } from '../../api/tasks.api';
import type { TaskPriority, TaskStatus, User } from '../../types';

export function TaskFilters({
  filters,
  users,
  onChange,
}: {
  filters: TaskFiltersValue;
  users: User[];
  onChange: (nextFilters: TaskFiltersValue) => void;
}) {
  const { t } = useTranslation();

  const statuses = useMemo<Array<{ label: string; value: TaskStatus | '' }>>(
    () => [
      { label: t('tasks.filters.allStatuses'), value: '' },
      { label: t('tasks.status.TODO'), value: 'TODO' },
      { label: t('tasks.status.IN_PROGRESS'), value: 'IN_PROGRESS' },
      { label: t('tasks.status.DONE'), value: 'DONE' },
    ],
    [t]
  );

  const priorities = useMemo<Array<{ label: string; value: TaskPriority | '' }>>(
    () => [
      { label: t('tasks.filters.allPriorities'), value: '' },
      { label: t('tasks.priority.LOW'), value: 'LOW' },
      { label: t('tasks.priority.MEDIUM'), value: 'MEDIUM' },
      { label: t('tasks.priority.HIGH'), value: 'HIGH' },
    ],
    [t]
  );

  return (
    <Card>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label={t('tasks.filters.search')}
              value={filters.search ?? ''}
              onChange={(event) => onChange({ ...filters, search: event.target.value })}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
            <TextField
              select
              fullWidth
              label={t('tasks.filters.status')}
              value={filters.status ?? ''}
              onChange={(event) => onChange({ ...filters, status: event.target.value as TaskStatus | '' })}
            >
              {statuses.map((status) => (
                <MenuItem key={status.value || 'all-statuses'} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2.5 }}>
            <TextField
              select
              fullWidth
              label={t('tasks.filters.priority')}
              value={filters.priority ?? ''}
              onChange={(event) => onChange({ ...filters, priority: event.target.value as TaskPriority | '' })}
            >
              {priorities.map((priority) => (
                <MenuItem key={priority.value || 'all-priorities'} value={priority.value}>
                  {priority.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2.5 }}>
            <TextField
              select
              fullWidth
              label={t('tasks.filters.assignee')}
              value={filters.assignedToId ?? ''}
              onChange={(event) => onChange({ ...filters, assignedToId: event.target.value })}
            >
              <MenuItem value="">{t('tasks.filters.allAssignees')}</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}
