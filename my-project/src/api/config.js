import axios from 'axios';

// 🌍 Determine API base URL based on environment
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return (
      import.meta.env.VITE_API_URL ||
      'https://web-app-clothes-printing-mern-stack-rmmc.onrender.com/api'
    );
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

// 🛠️ Safe logger (only logs in dev mode)
const devLog = (...args) => {
  if (!import.meta.env.PROD) {
    console.log(...args);
  }
};

devLog('🌐 API Configuration:', {
  environment: import.meta.env.PROD ? 'production' : 'development',
  baseURL: API_BASE_URL,
  envVars: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    PROD: import.meta.env.PROD,
  },
});

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Longer timeout for production
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔑 Request interceptor (attach token if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    devLog('🌐 API Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
    });
    return config;
  },
  (error) => {
    devLog('🌐 API Request Error:', error);
    return Promise.reject(error);
  }
);

// 📦 Response interceptor (log + error handling)
api.interceptors.response.use(
  (response) => {
    devLog('🌐 API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    devLog('🌐 API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data,
    });

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
      });
    }

    const { status, data } = error.response;

    // Handle specific HTTP codes
    switch (status) {
      case 401:
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (!window.location.pathname.includes('/signin')) {
          window.location.href = '/signin';
        }
        break;
      case 403:
        devLog('🌐 Access forbidden:', data);
        break;
      case 404:
        devLog('🌐 Resource not found:', data);
        break;
      case 500:
        devLog('🌐 Server error:', data);
        break;
      default:
        devLog('🌐 API error:', data);
    }

    // Standardized error response
    return Promise.reject({
      message:
        data?.message ||
        data?.error ||
        data?.errors?.[0] ||
        'An unexpected error occurred. Please try again.',
      status,
      data,
    });
  }
);

export default api;
