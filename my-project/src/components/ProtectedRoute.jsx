import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = '/signin' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with the intended destination (no alert)
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authentication is not required and user is authenticated, redirect to home (no alert)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and can access the protected route
  return children;
};

export default ProtectedRoute;
