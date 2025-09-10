import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validatePassword, validateEmail, validateName } from "../utils/passwordUtils";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import axios from "axios";

// Replace with your actual Render backend URL
const API_BASE_URL = "https://your-backend.onrender.com";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error: authError, success: authSuccess, clearError, clearSuccess, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated (no alert)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/#/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear auth errors and success when component mounts
  useEffect(() => {
    clearError();
    clearSuccess();
  }, [clearError, clearSuccess]);

  // Don't render the form if user is already authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    const nameValidation = validateName(form.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    const passwordValidation = validatePassword(form.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0]; // Show first error
    }

    // Validate confirm password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = form;
      await register(userData);
      // Use hash route to work with GitHub Pages base
      navigate('/#/');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      // handle success (e.g., save token, redirect)
      console.log(response.data);
    } catch (error) {
      // handle error
      console.error(error.response?.data || error.message);
    }
  };

  // Example usage in a form submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(form.email, form.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">Create Account</h2>
        
        {/* Display auth errors */}
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{authError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Display success messages */}
        {authSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{authSuccess}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className={`w-full p-3 border rounded-lg transition-colors focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg transition-colors focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-500'
              }`}
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className={`w-full p-3 border rounded-lg transition-colors focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <PasswordStrengthIndicator password={form.password} />
            <div className="mt-2 text-xs text-gray-500">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li className={form.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(form.password) ? 'text-green-600' : 'text-gray-500'}>
                  One uppercase letter
                </li>
                <li className={/[a-z]/.test(form.password) ? 'text-green-600' : 'text-gray-500'}>
                  One lowercase letter
                </li>
                <li className={/\d/.test(form.password) ? 'text-green-600' : 'text-gray-500'}>
                  One number
                </li>
                <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password) ? 'text-green-600' : 'text-gray-500'}>
                  One special character
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className={`w-full p-3 border rounded-lg transition-colors focus:outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors focus:outline-none ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-700 hover:bg-orange-800'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/signin" 
              className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-orange-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
