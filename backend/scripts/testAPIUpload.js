import fetch from 'node-fetch';
import FormData from 'form-data';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

dotenv.config();

// Test API upload endpoint
const testAPIUpload = async () => {
  try {
    console.log('🧪 Testing API upload endpoint...\n');
    
    // Create a simple test image buffer (1x1 PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
      0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const formData = new FormData();
    formData.append('images', testImageBuffer, {
      filename: 'test-image.png',
      contentType: 'image/png'
    });
    
    console.log('📤 Attempting to upload via API endpoint...');
    console.log('🌐 Endpoint: http://localhost:5000/api/upload/images');
    
    // Note: This will fail with auth error, but shows how to test
    try {
      const response = await fetch('http://localhost:5000/api/upload/images', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // You'd need a real admin token
        }
      });
      
      const result = await response.text();
      console.log('📊 Response:', result);
      
    } catch (fetchError) {
      if (fetchError.code === 'ECONNREFUSED') {
        console.log('❌ Server is not running on localhost:5000');
        console.log('💡 Start your server with: npm run dev');
        return;
      }
      throw fetchError;
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
};

// Instructions for manual testing
const showTestingInstructions = () => {
  console.log('\n' + '='.repeat(80));
  console.log('📋 Manual Testing Instructions:');
  console.log('='.repeat(80));
  
  console.log('\n1. 🔐 Get Admin JWT Token:');
  console.log('   POST http://localhost:5000/api/auth/login');
  console.log('   Body: { "email": "admin@example.com", "password": "your_password" }');
  
  console.log('\n2. 📤 Test Image Upload:');
  console.log('   POST http://localhost:5000/api/upload/images');
  console.log('   Headers: { "Authorization": "Bearer YOUR_TOKEN" }');
  console.log('   Body: FormData with "images" field');
  
  console.log('\n3. 🗂️ Test Product Creation with Files:');
  console.log('   POST http://localhost:5000/api/products/with-files');
  console.log('   Headers: { "Authorization": "Bearer YOUR_TOKEN" }');
  console.log('   Body: FormData with "productData" (JSON) + "images" + "models" fields');
  
  console.log('\n4. 🔍 Check Upload Results:');
  console.log('   - Visit: https://cloudinary.com/console');
  console.log('   - Or run: node scripts/listCloudinaryFiles.js');
  
  console.log('\n5. 🧪 Using Postman/Insomnia:');
  console.log('   - Set method to POST');
  console.log('   - Add Authorization header with Bearer token');
  console.log('   - Use form-data body type');
  console.log('   - Add files to "images" or "models" fields');
  
  console.log('\n📱 Frontend Example:');
  console.log(`
const uploadImages = async (files, token) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  
  const response = await fetch('/api/upload/images', {
    method: 'POST',
    headers: { 'Authorization': \`Bearer \${token}\` },
    body: formData
  });
  
  return response.json();
};`);
  
  console.log('\n' + '='.repeat(80));
};

// Run tests
testAPIUpload().then(() => {
  showTestingInstructions();
});
