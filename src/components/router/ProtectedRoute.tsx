import { Navigate } from 'react-router';
import type { ReactNode } from 'react';

import { getToken } from '@/utils/tokenStorage';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
