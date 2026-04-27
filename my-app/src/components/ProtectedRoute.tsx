import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-dev-runtime';
import FullScreenProgress from './FullScreenProgress';
import { useGetProfileQuery } from '../store/api';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading } = useGetProfileQuery();

  if (isLoading) return <FullScreenProgress />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
