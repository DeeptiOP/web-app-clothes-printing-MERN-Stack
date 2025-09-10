import cloudinary from '../config/cloudinary.js';
import dotenv from 'dotenv';

dotenv.config();

// List all files in Cloudinary
const listCloudinaryFiles = async () => {
  try {
    console.log('📁 Checking files in your Cloudinary account...\n');
    
    // Get all resources from Cloudinary
    const result = await cloudinary.search
      .expression('folder:products*') // Search in products folder and subfolders
      .max_results(100)
      .execute();
    
    console.log(`📊 Found ${result.total_count} files in products folder:`);
    console.log('─'.repeat(80));
    
    if (result.resources.length === 0) {
      console.log('📭 No files found in products folder yet.');
      console.log('💡 Upload some files using the API endpoints to see them here!');
      return;
    }
    
    // Group files by folder
    const filesByFolder = {};
    
    result.resources.forEach(resource => {
      const folder = resource.folder || 'root';
      if (!filesByFolder[folder]) {
        filesByFolder[folder] = [];
      }
      filesByFolder[folder].push(resource);
    });
    
    // Display files grouped by folder
    Object.keys(filesByFolder).sort().forEach(folder => {
      console.log(`\n📂 ${folder}/`);
      console.log('  ' + '─'.repeat(70));
      
      filesByFolder[folder].forEach(file => {
        const sizeKB = Math.round(file.bytes / 1024);
        console.log(`  📄 ${file.public_id.split('/').pop()}`);
        console.log(`     🔗 ${file.secure_url}`);
        console.log(`     📏 ${file.width}x${file.height} | ${sizeKB} KB | ${file.format.toUpperCase()}`);
        console.log(`     📅 Created: ${new Date(file.created_at).toLocaleString()}`);
        console.log('');
      });
    });
    
  } catch (error) {
    console.error('❌ Error listing Cloudinary files:', error.message);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n🔧 Solution: Check your Cloudinary credentials in .env file');
    }
  }
};

// Also check all folders (not just products)
const listAllFolders = async () => {
  try {
    console.log('\n🗂️  All folders in your Cloudinary account:');
    
    const result = await cloudinary.api.root_folders();
    
    if (result.folders.length === 0) {
      console.log('📭 No folders found.');
      return;
    }
    
    console.log('─'.repeat(40));
    result.folders.forEach(folder => {
      console.log(`📁 ${folder.name}`);
    });
    
    // Check products folder specifically
    try {
      const productsSubfolders = await cloudinary.api.sub_folders('products');
      if (productsSubfolders.folders.length > 0) {
        console.log('\n📁 products/ subfolders:');
        productsSubfolders.folders.forEach(subfolder => {
          console.log(`  📂 products/${subfolder.name}`);
        });
      }
    } catch (error) {
      if (!error.message.includes('does not exist')) {
        console.log('⚠️ Could not check products subfolders:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error listing folders:', error.message);
  }
};

// Run both functions
const checkCloudinary = async () => {
  await listAllFolders();
  await listCloudinaryFiles();
  
  console.log('\n' + '='.repeat(80));
  console.log('🔍 How to check manually:');
  console.log('1. Visit: https://cloudinary.com/console');
  console.log('2. Login to your account');
  console.log('3. Click "Media Library" in the sidebar');
  console.log('4. Navigate to folders: products/images, products/models, etc.');
  console.log('='.repeat(80));
};

checkCloudinary();
