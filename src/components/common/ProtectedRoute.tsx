import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; 
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/iniciar-sesion" replace />;
};

export default ProtectedRoute;