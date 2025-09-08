import React, { createContext, useContext, useState, useEffect } from 'react';
import { register, login, logout, getCurrentUser, updateProfile, changePassword } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getCurrentUser();
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register new user
  const signup = async (userData) => {
    try {
      setError(null);
      const response = await register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    }
  };

  // Login user
  const signin = async (credentials) => {
    try {
      setError(null);
      const response = await login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  // Logout user
  const signout = () => {
    try {
      logout();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      setError(null);
      const response = await updateProfile(profileData);
      setUser(response.data);
      return response;
    } catch (error) {
      setError(error.message || 'Profile update failed');
      throw error;
    }
  };

  // Change password
  const changeUserPassword = async (passwordData) => {
    try {
      setError(null);
      const response = await changePassword(passwordData);
      return response;
    } catch (error) {
      setError(error.message || 'Password change failed');
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    updateUserProfile,
    changeUserPassword,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
