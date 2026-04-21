import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/axios';

interface AxiosSetupProps {
  children: React.ReactNode;
}

const AxiosSetup: React.FC<AxiosSetupProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error) && error.response?.status === 401 && error.config?.url !== '/auth/status') {
          logout();
          navigate('/login', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [logout, navigate]);

  return <>{children}</>;
};

export default AxiosSetup;
