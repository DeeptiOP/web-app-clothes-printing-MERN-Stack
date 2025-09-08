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
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { signup, clearError, isAuthenticated } = useAuth();
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear password error when user types
    if (name === 'confirmPassword' || name === 'password') {
      setPasswordError("");
    }
    // Clear general error when user types
    setError("");
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      console.log('Attempting registration with:', { name: form.name, email: form.email });
      
      const { confirmPassword, ...signupData } = form;
      const response = await signup(signupData);
      console.log('Registration successful:', response);
      
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      
      // Better error handling
      if (error.message) {
        setError(error.message);
      } else if (error.errors && error.errors.length > 0) {
        setError(error.errors[0].msg);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-700">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:outline-none"
            value={form.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded focus:outline-none"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          
          {passwordError && (
            <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {passwordError}
            </div>
          )}
          
          <button
            type="submit"
            className={`w-full py-3 rounded font-semibold transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-700 hover:bg-orange-800'
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
