import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Alert, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { tasksApi } from '../api/tasks.api';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { PageHeader } from '../components/common/PageHeader';
import { TaskForm, type TaskFormValues } from '../components/tasks/TaskForm';
import { TaskPriorityChip } from '../components/tasks/TaskPriorityChip';
import { TaskStatusChip } from '../components/tasks/TaskStatusChip';
import { useUsers } from '../features/users/use-users';
import type { Task } from '../types';

export function TaskDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, isLoading: isUsersLoading } = useUsers();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    void tasksApi.getById(id).then(setTask).finally(() => setIsLoading(false));
  }, [id]);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.resolvedLanguage === 'en' ? 'en-US' : 'es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    [i18n.resolvedLanguage]
  );

  if (isLoading || isUsersLoading || !task) return <LoadingScreen />;

  const handleUpdate = async (values: TaskFormValues) => {
    const updatedTask = await tasksApi.update(task.id, values);
    setTask(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await tasksApi.remove(task.id);
    navigate('/app');
  };

  return (
    <Stack spacing={2.5}>
      <PageHeader title={t('tasks.detail.title')} subtitle={t('tasks.detail.subtitle')} />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
              <Typography variant="h5">{task.title}</Typography>
              <Stack direction="row" spacing={1}>
                <TaskPriorityChip priority={task.priority} />
                <TaskStatusChip status={task.status} />
              </Stack>
            </Stack>
            <Typography color="text.secondary">{task.description}</Typography>
            <Divider />
            <Typography variant="body2">{t('tasks.detail.assignedTo')}: {task.assignedTo.name}</Typography>
            <Typography variant="body2">{t('tasks.detail.createdBy')}: {task.createdBy.name}</Typography>
            <Typography variant="body2">{t('tasks.detail.createdAt')}: {formatter.format(new Date(task.createdAt))}</Typography>
            <Typography variant="body2">{t('tasks.detail.updatedAt')}: {formatter.format(new Date(task.updatedAt))}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5}>
              <Button startIcon={<EditRoundedIcon />} variant="contained" onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? t('tasks.detail.closeEdit') : t('tasks.detail.edit')}
              </Button>
              <Button startIcon={<DeleteRoundedIcon />} color="error" variant="outlined" onClick={() => void handleDelete()}>
                {t('tasks.detail.delete')}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {isEditing ? (
        <>
          <Alert severity="warning">{t('tasks.detail.editWarning')}</Alert>
          <TaskForm users={users} defaultValues={task} onSubmit={handleUpdate} submitLabel={t('tasks.form.update')} />
        </>
      ) : null}
    </Stack>
  );
}
