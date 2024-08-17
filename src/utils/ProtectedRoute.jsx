import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../hooks/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { session } = UserAuth();
  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
