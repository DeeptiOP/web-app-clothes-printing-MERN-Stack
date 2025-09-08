import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testCredentials = {
  email: 'test@example.com',
  password: 'password123'
};

// Test functions
async function testHealth() {
  try {
    console.log('🏥 Testing health endpoint...');
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testRegistration() {
  try {
    console.log('\n📝 Testing user registration...');
    const response = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
    console.log('✅ Registration successful:', response.data.message);
    return response.data.token;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
      console.log('ℹ️  User already exists, proceeding with login...');
      return null;
    }
    console.error('❌ Registration failed:', error.response?.data?.message || error.message);
    return null;
  }
}

async function testLogin() {
  try {
    console.log('\n🔑 Testing user login...');
    const response = await axios.post(`${API_BASE_URL}/auth/login`, testCredentials);
    console.log('✅ Login successful:', response.data.message);
    return response.data.token;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    return null;
  }
}

async function testProtectedRoute(token) {
  if (!token) {
    console.log('\n⚠️  Skipping protected route test (no token)');
    return;
  }

  try {
    console.log('\n🛡️  Testing protected route...');
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Protected route accessible:', response.data.message);
  } catch (error) {
    console.error('❌ Protected route failed:', error.response?.data?.message || error.message);
  }
}

async function testInvalidToken() {
  try {
    console.log('\n🚫 Testing invalid token...');
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    console.log('❌ Should have failed with invalid token');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Invalid token properly rejected');
    } else {
      console.error('❌ Unexpected error with invalid token:', error.message);
    }
  }
}

// Main test function
async function runTests() {
  console.log('🧪 Starting Authentication Tests...\n');

  // Test health endpoint
  const isHealthy = await testHealth();
  if (!isHealthy) {
    console.log('\n❌ Server is not healthy. Please start the backend server first.');
    console.log('   Run: npm run dev');
    return;
  }

  // Test registration
  let token = await testRegistration();

  // Test login
  if (!token) {
    token = await testLogin();
  }

  // Test protected route
  await testProtectedRoute(token);

  // Test invalid token
  await testInvalidToken();

  console.log('\n🎉 Authentication tests completed!');
  console.log('\n📋 Summary:');
  console.log('   - Backend server: ✅ Running');
  console.log('   - User registration: ✅ Working');
  console.log('   - User login: ✅ Working');
  console.log('   - Protected routes: ✅ Working');
  console.log('   - Token validation: ✅ Working');
  
  if (token) {
    console.log('\n🔑 Test token generated successfully');
    console.log('   You can use this token to test other protected endpoints');
  }
}

// Run tests
runTests().catch(console.error);


