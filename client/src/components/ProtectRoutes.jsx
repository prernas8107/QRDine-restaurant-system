import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthenticatedLayout from './AuthenticatedLayout';

function ProtectRoutes({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const sessionToken = localStorage.getItem('sessionToken');

  // Allow access if user has either accessToken (logged in) or sessionToken (guest)
  if (!accessToken && !sessionToken) {
    const search = location.search;
    return <Navigate to={`/welcome${search}`} replace />;
  }

  return (
    <div>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </div>
  );
}

export default ProtectRoutes;