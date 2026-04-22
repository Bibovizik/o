import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react/jsx-dev-runtime';
import FullScreenProgress from './FullScreenProgress';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullScreenProgress />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
