import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signin, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      console.log('Attempting login with:', { email: form.email, password: form.password });
      
      const response = await signin(form);
      console.log('Login successful:', response);
      
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      
      // Better error handling
      if (error.message) {
        setError(error.message);
      } else if (error.errors && error.errors.length > 0) {
        setError(error.errors[0].msg);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-700">Welcome Back</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none"
            value={form.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`w-full py-3 rounded font-semibold transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-700 hover:bg-orange-800'
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 space-y-2">
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-center text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
        
        {/* Debug info - remove in production */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
          <p><strong>Debug Info:</strong></p>
          <p>API URL: http://localhost:5000/api</p>
          <p>Test Email: test@example.com</p>
          <p>Test Password: password123</p>
          <p>Admin Email: admin@clothesprinting.com</p>
          <p>Admin Password: Admin@123456</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
