// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;


