import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SecureRouteProps {
    redirectPath?: string;
    children?: React.ReactNode;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ redirectPath = '/login', children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default SecureRoute;