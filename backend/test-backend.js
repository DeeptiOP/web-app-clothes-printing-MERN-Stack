// Simple test script to check if backend is working
const testBackend = async () => {
  try {
    console.log('🧪 Testing Backend Endpoints...\n');

    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health Check:', healthData.message);
    } else {
      console.log('❌ Health Check Failed');
      return;
    }

    // Test 2: Get Products
    console.log('\n2. Testing Products Endpoint...');
    const productsResponse = await fetch('http://localhost:5000/api/products');
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('✅ Products Endpoint:', `Found ${productsData.count} products`);
    } else {
      console.log('❌ Products Endpoint Failed');
    }

    // Test 3: Test User Registration
    console.log('\n3. Testing User Registration...');
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123'
      })
    });

    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ User Registration: Success');
      console.log('Token received:', registerData.token ? 'Yes' : 'No');
    } else {
      const errorData = await registerResponse.json();
      if (errorData.message.includes('already exists')) {
        console.log('✅ User Registration: User already exists (expected)');
      } else {
        console.log('❌ User Registration Failed:', errorData.message);
      }
    }

    console.log('\n🎉 Backend test completed!');

  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    console.log('\n💡 Make sure your backend server is running on port 5000');
    console.log('Run: npm run dev in the backend directory');
  }
};

testBackend();
