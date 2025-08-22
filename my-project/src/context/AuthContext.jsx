import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAPI, register as registerAPI, logout as logoutAPI, getCurrentUser, isAuthenticated, getStoredUser } from '../api/auth';

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

  // Check if user is authenticated on app load
  useEffect(() => {
    console.log('🔐 AuthProvider: Initializing authentication check...');
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          console.log('🔐 AuthProvider: User has valid token, checking stored user...');
          const storedUser = getStoredUser();
          if (storedUser) {
            console.log('🔐 AuthProvider: Found stored user:', storedUser.name);
            setUser(storedUser);
          } else {
            console.log('🔐 AuthProvider: No stored user, fetching from API...');
            // Try to get user from API
            const userData = await getCurrentUser();
            console.log('🔐 AuthProvider: API user data:', userData);
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data));
          }
        } else {
          console.log('🔐 AuthProvider: No valid token found');
        }
      } catch (error) {
        console.error('🔐 AuthProvider: Auth check failed:', error);
        // Clear invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
        console.log('🔐 AuthProvider: Authentication check completed');
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    console.log('🔐 AuthProvider: Attempting login with:', credentials.email);
    try {
      setError(null);
      setLoading(true);
      const response = await loginAPI(credentials);
      console.log('🔐 AuthProvider: Login successful:', response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('🔐 AuthProvider: Login failed:', error);
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    console.log('🔐 AuthProvider: Attempting registration for:', userData.email);
    try {
      setError(null);
      setLoading(true);
      const response = await registerAPI(userData);
      console.log('🔐 AuthProvider: Registration successful:', response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('🔐 AuthProvider: Registration failed:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🔐 AuthProvider: Logging out user');
    try {
      logoutAPI();
    } catch (error) {
      console.error('🔐 AuthProvider: Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
      console.log('🔐 AuthProvider: User logged out successfully');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  console.log('🔐 AuthProvider: Current state:', { user: !!user, loading, error, isAuthenticated: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
