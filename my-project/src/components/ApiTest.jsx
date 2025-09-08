import React, { useState } from 'react';
import api from '../api/config';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResults({});

    try {
      // Test 1: Health endpoint
      console.log('Testing health endpoint...');
      const healthResponse = await api.get('/health');
      setTestResults(prev => ({ ...prev, health: { success: true, data: healthResponse.data } }));
      console.log('Health test passed:', healthResponse.data);

      // Test 2: Direct login test
      console.log('Testing direct login...');
      const loginResponse = await api.post('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      setTestResults(prev => ({ ...prev, login: { success: true, data: loginResponse.data } }));
      console.log('Login test passed:', loginResponse.data);

      // Test 3: Test with token
      if (loginResponse.data.token) {
        console.log('Testing protected route with token...');
        const meResponse = await api.get('/auth/me');
        setTestResults(prev => ({ ...prev, protected: { success: true, data: meResponse.data } }));
        console.log('Protected route test passed:', meResponse.data);
      }

    } catch (error) {
      console.error('API test failed:', error);
      const endpoint = error.config?.url || 'unknown';
      setTestResults(prev => ({ 
        ...prev, 
        [endpoint]: { 
          success: false, 
          error: error.response?.data || error.message,
          status: error.response?.status
        } 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-700">API Connection Test</h2>
        
        <button
          onClick={testApiConnection}
          disabled={isLoading}
          className={`w-full py-3 rounded font-semibold transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white mb-6`}
        >
          {isLoading ? 'Testing...' : 'Test API Connection'}
        </button>

        <div className="space-y-4">
          {Object.entries(testResults).map(([endpoint, result]) => (
            <div key={endpoint} className={`p-4 rounded border ${
              result.success ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
            }`}>
              <h3 className="font-semibold mb-2">
                {endpoint === '/health' ? 'Health Check' : 
                 endpoint === '/auth/login' ? 'Login Test' : 
                 endpoint === '/auth/me' ? 'Protected Route Test' : endpoint}
              </h3>
              
              {result.success ? (
                <div className="text-green-800">
                  <p>✅ Success!</p>
                  <pre className="text-xs mt-2 bg-white p-2 rounded overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-red-800">
                  <p>❌ Failed</p>
                  <p>Status: {result.status}</p>
                  <p>Error: {result.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Test Credentials:</h3>
          <p><strong>Regular User:</strong> test@example.com / password123</p>
          <p><strong>Admin User:</strong> admin@clothesprinting.com / Admin@123456</p>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;

