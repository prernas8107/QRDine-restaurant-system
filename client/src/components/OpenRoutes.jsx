import React from 'react';
import { Navigate } from 'react-router-dom';
function OpenRoutes({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
}

export default OpenRoutes;

//rbac => role based access control 
// student => ui access => student 
//master =>