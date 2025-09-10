import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
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
  const [success, setSuccess] = useState(null);

  // Check if user is authenticated on app load (guard against StrictMode double-invoke)
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const storedUser = getStoredUser();
          if (storedUser) {
            setUser(storedUser);
          } else {
            const userData = await getCurrentUser();
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data));
          }
        }
      } catch (error) {
        // Clear invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      const response = await loginAPI(credentials);
      setUser(response.user);
      setSuccess('Login successful! Welcome back.');
      return response;
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('Invalid credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('User not found')) {
          errorMessage = 'No account found with this email address.';
        } else if (error.message.includes('Account not verified')) {
          errorMessage = 'Please verify your email address before logging in.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      const response = await registerAPI(userData);
      setUser(response.user);
      setSuccess('Account created successfully! Welcome to PrinTeeQ.');
      return response;
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('User already exists')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.';
        } else if (error.message.includes('Validation error')) {
          // Show specific validation errors if available
          if (error.errors && error.errors.length > 0) {
            errorMessage = error.errors.map(err => err.msg).join('. ');
          } else {
            errorMessage = 'Please check your information and try again.';
          }
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      logoutAPI();
    } catch (error) {
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    success,
    login,
    register,
    logout,
    clearError,
    clearSuccess,
    isAuthenticated: !!user
  }), [user, loading, error, success]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
