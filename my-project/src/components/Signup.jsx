import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error: authError, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated (no alert)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

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

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (form.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

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
      navigate('/', { replace: true });
    } catch (error) {
      // Error is handled by the auth context
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">Create Account</h2>
        
        {/* Display auth errors */}
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {authError}
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
            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
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
