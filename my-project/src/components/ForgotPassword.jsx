import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-700">Forgot Password</h2>
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 rounded font-semibold transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-700 hover:bg-orange-800'
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/signin" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
