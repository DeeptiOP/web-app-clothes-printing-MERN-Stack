import axios from 'axios';

// Determine API base URL based on environment
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // Production: use the deployed backend URL
    // You can set this in your environment variables or use the actual deployed URL
    return import.meta.env.VITE_API_URL || 'https://web-app-clothes-printing-mern-stack.onrender.com/api';
  }
  // Development: use localhost
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🌐 API Configuration:', {
  environment: import.meta.env.PROD ? 'production' : 'development',
  baseURL: API_BASE_URL,
  envVars: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    PROD: import.meta.env.PROD
  }
});

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout for production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🌐 API Request:', { url: config.url, method: config.method, hasToken: !!token });
    } else {
      console.log('🌐 API Request:', { url: config.url, method: config.method, hasToken: false });
    }
    return config;
  },
  (error) => {
    console.error('🌐 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('🌐 API Response:', { url: response.config.url, status: response.status, data: response.data });
    return response;
  },
  (error) => {
    console.error('🌐 API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    });

    // Handle network errors
    if (!error.response) {
      console.error('🌐 Network error:', error);
      return Promise.reject({
        message: 'Network error. Please check your internet connection and try again.'
      });
    }

    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 401:
        // Token expired or invalid
        console.log('🌐 Token expired or invalid, clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Optionally redirect to login
        if (window.location.pathname !== '/signin') {
          window.location.href = '/#/signin';
        }
        break;
      case 403:
        console.error('🌐 Access forbidden:', error.response.data);
        break;
      case 404:
        console.error('🌐 Resource not found:', error.response.data);
        break;
      case 500:
        console.error('🌐 Server error:', error.response.data);
        break;
      default:
        console.error('🌐 API error:', error.response.data);
    }

    // Return a standardized error object
    return Promise.reject({
      message: error.response.data?.message || 'An unexpected error occurred. Please try again.',
      status: error.response.status,
      data: error.response.data
    });
  }
);

export default api;
