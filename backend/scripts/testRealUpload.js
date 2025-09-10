import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Test real upload to Cloudinary
const testRealUpload = async () => {
  try {
    console.log('🧪 Testing real file upload to Cloudinary...');
    console.log('📋 Configuration:');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Present' : '❌ Missing');
    console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Present' : '❌ Missing');
    
    // Create a simple test image buffer (1x1 PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
      0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    console.log('\n🔄 Uploading test image...');
    
    // Upload the test image
    const result = await uploadBufferToCloudinary(
      testImageBuffer, 
      'products/test', 
      `test_image_${Date.now()}`
    );
    
    console.log('✅ Upload successful!');
    console.log('📊 Upload details:');
    console.log('  URL:', result.url);
    console.log('  Public ID:', result.publicId);
    console.log('  Format:', result.format);
    console.log('  Resource Type:', result.resourceType);
    
    console.log('\n🌐 You can view this image at:', result.url);
    console.log('📱 Check your Cloudinary dashboard at: https://cloudinary.com/console');
    console.log('📁 Look in the "Media Library" > "products" > "test" folder');
    
    // Ask if user wants to delete the test image
    console.log('\n⏳ Waiting 5 seconds, then cleaning up test image...');
    
    setTimeout(async () => {
      try {
        await deleteFromCloudinary(result.publicId);
        console.log('🧹 Test image cleaned up successfully');
      } catch (error) {
        console.log('⚠️ Could not clean up test image:', error.message);
      }
    }, 5000);
    
  } catch (error) {
    console.error('❌ Upload test failed:', error.message);
    
    if (error.message.includes('Invalid API key or secret')) {
      console.log('\n🔧 Solution: Check your Cloudinary credentials in .env file');
    } else if (error.message.includes('Must supply api_key')) {
      console.log('\n🔧 Solution: Make sure you run this from the backend directory');
    } else {
      console.log('\n🔧 Check your internet connection and Cloudinary account status');
    }
  }
};

testRealUpload();
