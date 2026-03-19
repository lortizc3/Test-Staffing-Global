import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/auth-context';
import { LoadingScreen } from './LoadingScreen';

export function ProtectedRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
