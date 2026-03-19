import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Alert, Box, Button, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KanbanBoard } from '../components/board/KanbanBoard';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { PageHeader } from '../components/common/PageHeader';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskTable } from '../components/tasks/TaskTable';
import { useTasks } from '../features/tasks/use-tasks';
import { useUsers } from '../features/users/use-users';

export function DashboardPage() {
  const { t } = useTranslation();
  const { tasks, filters, setFilters, fetchTasks, isLoading } = useTasks();
  const { users, isLoading: usersLoading } = useUsers();
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  const totalMessage = useMemo(() => t('tasks.count', { count: tasks.length }), [t, tasks.length]);

  if (isLoading || usersLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack spacing={2.5}>
      <PageHeader title={t('dashboard.title')} subtitle={t('dashboard.subtitle')} />
      <TaskFilters filters={filters} users={users} onChange={setFilters} />
      <Alert
        severity="info"
        action={<Button startIcon={<RefreshRoundedIcon />} onClick={() => void fetchTasks()}>{t('app.actions.reload')}</Button>}
      >
        {totalMessage}
      </Alert>
      <Stack direction="row" gap={1}>
        <Button variant={view === 'kanban' ? 'contained' : 'outlined'} onClick={() => setView('kanban')}>{t('app.views.kanban')}</Button>
        <Button variant={view === 'table' ? 'contained' : 'outlined'} onClick={() => setView('table')}>{t('app.views.table')}</Button>
      </Stack>
      <Box>
        {view === 'kanban' ? <KanbanBoard tasks={tasks} onTaskUpdated={fetchTasks} /> : <TaskTable tasks={tasks} />}
      </Box>
    </Stack>
  );
}
