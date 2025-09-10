import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo = '/signin',
  rating // optional prop
}) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  // Optional: use rating from props or from user context
  const userRating = rating ?? user?.rating ?? 0;

  // Example check with rating (optional)
  // If you want to restrict access based on rating, uncomment this:
  // if (userRating < 1) {
  //   return <Navigate to="/no-access" replace />;
  // }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authentication is not required and user is authenticated, redirect to home
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and can access the protected route
  return children;
};

export default ProtectedRoute;
