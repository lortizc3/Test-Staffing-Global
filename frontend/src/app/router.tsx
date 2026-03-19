import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { AppShell } from '../components/layout/AppShell';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { NewTaskPage } from '../pages/NewTaskPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TaskDetailPage } from '../pages/TaskDetailPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/app" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'tasks/new', element: <NewTaskPage /> },
          { path: 'tasks/:id', element: <TaskDetailPage /> },
        ],
      },
    ],
  },
]);
