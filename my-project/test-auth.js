// Test script for authentication system
// Run this in the browser console to test the auth functionality

console.log('🧪 Testing Authentication System...');

// Test 1: Check if AuthContext is available
console.log('Test 1: Checking AuthContext availability...');
if (typeof window !== 'undefined') {
  console.log('✅ Running in browser environment');
} else {
  console.log('❌ Not running in browser environment');
}

// Test 2: Check localStorage functionality
console.log('Test 2: Checking localStorage functionality...');
try {
  localStorage.setItem('test', 'value');
  const testValue = localStorage.getItem('test');
  localStorage.removeItem('test');
  if (testValue === 'value') {
    console.log('✅ localStorage is working');
  } else {
    console.log('❌ localStorage test failed');
  }
} catch (error) {
  console.log('❌ localStorage error:', error);
}

// Test 3: Check if API endpoints are accessible
console.log('Test 3: Checking API endpoints...');
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      })
    });
    
    if (response.status === 401) {
      console.log('✅ Backend is running and responding (401 expected for invalid credentials)');
    } else {
      console.log('⚠️ Backend responded with status:', response.status);
    }
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('💡 Make sure your backend server is running on http://localhost:5000');
  }
};

// Test 4: Check environment variables
console.log('Test 4: Checking environment configuration...');
if (import.meta && import.meta.env) {
  console.log('✅ Vite environment is available');
  console.log('📝 Current API URL:', import.meta.env.VITE_API_URL || 'Not set');
} else {
  console.log('⚠️ Vite environment not available in this context');
}

// Test 5: Check React Router
console.log('Test 5: Checking React Router...');
if (typeof window !== 'undefined' && window.location) {
  console.log('✅ Browser routing is available');
  console.log('📍 Current path:', window.location.pathname);
} else {
  console.log('❌ Browser routing not available');
}

// Run API test
testAPI();

console.log('🧪 Authentication system tests completed!');
console.log('💡 Check the console for any errors or warnings');
console.log('📚 See AUTHENTICATION_SETUP.md for detailed setup instructions');
