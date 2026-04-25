import type { ReactNode } from 'react';
import { useGetProfileQuery } from '../store/api';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useGetProfileQuery();

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
