import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { tasksApi } from '../api/tasks.api';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { PageHeader } from '../components/common/PageHeader';
import { TaskForm, type TaskFormValues } from '../components/tasks/TaskForm';
import { useUsers } from '../features/users/use-users';

export function NewTaskPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { users, isLoading } = useUsers();

  const handleSubmit = async (values: TaskFormValues) => {
    await tasksApi.create(values);
    navigate('/app');
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <PageHeader title={t('tasks.createPage.title')} subtitle={t('tasks.createPage.subtitle')} />
      <TaskForm users={users} onSubmit={handleSubmit} submitLabel={t('tasks.form.create')} />
    </>
  );
}
