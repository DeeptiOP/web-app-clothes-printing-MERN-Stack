// Test script to check backend connectivity
// Run this in the browser console to test the backend connection

console.log('🧪 Testing Backend Connection...');

// Test 1: Check if we can reach the backend
const testBackendConnection = async () => {
  try {
    console.log('🌐 Testing connection to: http://localhost:5000/api/auth/login');
    
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
    
    console.log('🌐 Response status:', response.status);
    console.log('🌐 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.status === 401) {
      console.log('✅ Backend is running and responding (401 expected for invalid credentials)');
      console.log('✅ CORS is properly configured');
    } else if (response.status === 200) {
      console.log('⚠️ Backend responded with 200 (unexpected for invalid credentials)');
    } else {
      console.log('⚠️ Backend responded with status:', response.status);
    }
    
    try {
      const data = await response.json();
      console.log('🌐 Response data:', data);
    } catch (parseError) {
      console.log('🌐 Could not parse response as JSON');
    }
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    
    if (error.message.includes('Failed to fetch')) {
      console.log('💡 This usually means:');
      console.log('   1. Backend server is not running');
      console.log('   2. Backend is running on a different port');
      console.log('   3. CORS is not properly configured');
      console.log('   4. Network/firewall issues');
    }
    
    if (error.message.includes('CORS')) {
      console.log('💡 CORS issue detected. Check backend CORS configuration.');
    }
  }
};

// Test 2: Check environment variables
console.log('🔧 Environment Check:');
console.log('   - import.meta.env available:', !!import.meta?.env);
console.log('   - VITE_API_URL:', import.meta?.env?.VITE_API_URL || 'Not set');
console.log('   - PROD mode:', import.meta?.env?.PROD || false);

// Test 3: Check localStorage
console.log('💾 LocalStorage Check:');
try {
  localStorage.setItem('test', 'value');
  const testValue = localStorage.getItem('test');
  localStorage.removeItem('test');
  console.log('   - localStorage working:', testValue === 'value');
} catch (error) {
  console.log('   - localStorage error:', error.message);
}

// Test 4: Check current location
console.log('📍 Current Location:', window.location.href);

// Run the backend test
testBackendConnection();

console.log('🧪 Backend connection test completed!');
console.log('💡 Check the console for results and any error messages');
