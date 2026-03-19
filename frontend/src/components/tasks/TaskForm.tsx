import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, Grid2, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import type { Task, User } from '../../types';

export type TaskFormValues = {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedToId: string;
};

export function TaskForm({
  users,
  defaultValues,
  onSubmit,
  submitLabel,
}: {
  users: User[];
  defaultValues?: Partial<Task>;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  submitLabel: string;
}) {
  const { t } = useTranslation();

  const formSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(3, t('tasks.validation.titleMin')),
        description: z.string().min(5, t('tasks.validation.descriptionMin')),
        status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
        assignedToId: z.string().min(1, t('tasks.validation.assigneeRequired')),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      status: defaultValues?.status ?? 'TODO',
      priority: defaultValues?.priority ?? 'MEDIUM',
      assignedToId: defaultValues?.assignedToId ?? users[0]?.id ?? '',
    },
  });

  return (
    <Card>
      <CardContent>
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField fullWidth label={t('tasks.form.title')} {...register('title')} error={Boolean(errors.title)} helperText={errors.title?.message} />
            </Grid2>
            <Grid2 size={12}>
              <TextField fullWidth multiline minRows={4} label={t('tasks.form.description')} {...register('description')} error={Boolean(errors.description)} helperText={errors.description?.message} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth select label={t('tasks.form.status')} defaultValue={defaultValues?.status ?? 'TODO'} {...register('status')}>
                <MenuItem value="TODO">{t('tasks.status.TODO')}</MenuItem>
                <MenuItem value="IN_PROGRESS">{t('tasks.status.IN_PROGRESS')}</MenuItem>
                <MenuItem value="DONE">{t('tasks.status.DONE')}</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth select label={t('tasks.form.priority')} defaultValue={defaultValues?.priority ?? 'MEDIUM'} {...register('priority')}>
                <MenuItem value="LOW">{t('tasks.priority.LOW')}</MenuItem>
                <MenuItem value="MEDIUM">{t('tasks.priority.MEDIUM')}</MenuItem>
                <MenuItem value="HIGH">{t('tasks.priority.HIGH')}</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth select label={t('tasks.form.assignee')} defaultValue={defaultValues?.assignedToId ?? users[0]?.id ?? ''} {...register('assignedToId')} error={Boolean(errors.assignedToId)} helperText={errors.assignedToId?.message}>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                ))}
              </TextField>
            </Grid2>
          </Grid2>
          <Stack direction="row" justifyContent="flex-end" mt={3}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>{submitLabel}</Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
