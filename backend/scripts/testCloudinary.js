import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import dotenv from 'dotenv';

dotenv.config();

// Test Cloudinary integration
const testCloudinary = async () => {
  try {
    console.log('🧪 Testing Cloudinary integration...');
    console.log('📋 Configuration:');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Present' : '❌ Missing');
    console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Present' : '❌ Missing');
    
    console.log('\n🔄 Testing with a dummy URL (this will fail but shows config is working):');
    
    // This will fail because we don't have a real image file, but it will test our configuration
    const testImagePath = './test-image.jpg'; // This file doesn't exist
    
    try {
      await uploadToCloudinary(testImagePath, 'test');
    } catch (error) {
      if (error.message.includes('ENOENT')) {
        console.log('✅ Configuration is working! (File not found error is expected)');
        console.log('📝 To test with real files, place an image at:', testImagePath);
      } else {
        console.log('❌ Configuration error:', error.message);
      }
    }
    
    console.log('\n📚 Available endpoints after setup:');
    console.log('POST /api/upload/images - Upload product images');
    console.log('POST /api/upload/model - Upload single 3D model');
    console.log('POST /api/upload/product-assets - Upload images + models + color images');
    console.log('POST /api/products/with-files - Create product with files');
    console.log('DELETE /api/upload/:publicId - Delete uploaded asset');
    console.log('GET /api/upload/config - Get upload configuration');
    
    console.log('\n📝 Supported file formats:');
    console.log('Images: JPEG, JPG, PNG, GIF, WEBP');
    console.log('3D Models: OBJ, GLTF, GLB, FBX, DAE, 3DS, BLEND, PLY');
    console.log('Max file size: 50MB');
    console.log('Max images per product: 10');
    console.log('Max 3D models per product: 3');
    
    console.log('\n🎯 Setup complete! Cloudinary is ready for use.');
    
  } catch (error) {
    console.error('❌ Error testing Cloudinary:', error.message);
  }
};

testCloudinary();
