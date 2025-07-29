// import { useAuth0 } from '@auth0/auth0-react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const { isAuthenticated, isLoading } = useAuth0();
  // const token = localStorage.getItem('token');
  const token = getCookie('auth_token');

  // if (isLoading) {
  //   return <div>Загрузка...</div>;
  // }

  // if (!isAuthenticated) {
  if (!token) {
    console.log('нет аутентификации')
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;