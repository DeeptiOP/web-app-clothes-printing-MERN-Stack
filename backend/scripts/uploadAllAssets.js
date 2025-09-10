import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Path to your assets folder
const ASSETS_PATH = path.join(process.cwd(), '..', 'my-project', 'src', 'assets');

// Upload all assets to Cloudinary
const uploadAllAssets = async () => {
  try {
    console.log('📁 Uploading all assets to Cloudinary...');
    console.log('📂 Assets folder:', ASSETS_PATH);
    
    // Check if assets folder exists
    if (!fs.existsSync(ASSETS_PATH)) {
      console.log('❌ Assets folder not found:', ASSETS_PATH);
      return;
    }
    
    // Read all files in assets folder
    const files = fs.readdirSync(ASSETS_PATH);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    console.log(`📊 Found ${imageFiles.length} image files to upload`);
    
    if (imageFiles.length === 0) {
      console.log('📭 No image files found in assets folder');
      return;
    }
    
    // Group files by category
    const categories = {
      products: [],
      designs: [],
      hoodies: [],
      shirts: [],
      oversized: [], // os files
      fullsleeve: [], // fs files
      tank: [], // st files (assuming tank tops)
      prints: [],
      ui: [] // banner, cart, search, user, etc.
    };
    
    // Categorize files
    imageFiles.forEach(file => {
      const fileName = file.toLowerCase();
      
      if (fileName.startsWith('product')) {
        categories.products.push(file);
      } else if (fileName.startsWith('design')) {
        categories.designs.push(file);
      } else if (fileName.startsWith('hoodie')) {
        categories.hoodies.push(file);
      } else if (fileName.startsWith('shirt')) {
        categories.shirts.push(file);
      } else if (fileName.startsWith('os')) {
        categories.oversized.push(file);
      } else if (fileName.startsWith('fs')) {
        categories.fullsleeve.push(file);
      } else if (fileName.startsWith('st')) {
        categories.tank.push(file);
      } else if (fileName.startsWith('print')) {
        categories.prints.push(file);
      } else if (fileName.startsWith('t_shirt')) {
        categories.products.push(file); // T-shirt variants
      } else {
        categories.ui.push(file); // banner, cart, search, etc.
      }
    });
    
    // Display categories
    console.log('\n📋 File categories:');
    Object.entries(categories).forEach(([category, files]) => {
      if (files.length > 0) {
        console.log(`  📂 ${category}: ${files.length} files`);
      }
    });
    
    const uploadedFiles = [];
    let successCount = 0;
    let errorCount = 0;
    
    // Upload files by category
    for (const [category, files] of Object.entries(categories)) {
      if (files.length === 0) continue;
      
      console.log(`\n📤 Uploading ${category} files...`);
      
      for (const file of files) {
        try {
          const filePath = path.join(ASSETS_PATH, file);
          const fileName = path.parse(file).name; // filename without extension
          
          // Determine Cloudinary folder
          let cloudinaryFolder;
          if (category === 'ui') {
            cloudinaryFolder = 'assets/ui';
          } else if (category === 'designs') {
            cloudinaryFolder = 'assets/designs';
          } else {
            cloudinaryFolder = `products/${category}`;
          }
          
          console.log(`  📄 Uploading ${file}...`);
          
          const result = await uploadToCloudinary(filePath, cloudinaryFolder);
          
          uploadedFiles.push({
            originalName: file,
            cloudinaryUrl: result.url,
            publicId: result.publicId,
            category: category,
            folder: cloudinaryFolder
          });
          
          successCount++;
          console.log(`    ✅ Success: ${result.url}`);
          
          // Small delay to avoid overwhelming Cloudinary
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.log(`    ❌ Failed to upload ${file}: ${error.message}`);
          errorCount++;
        }
      }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('📊 Upload Summary:');
    console.log('='.repeat(80));
    console.log(`✅ Successfully uploaded: ${successCount} files`);
    console.log(`❌ Failed uploads: ${errorCount} files`);
    console.log(`📁 Total processed: ${successCount + errorCount} files`);
    
    if (uploadedFiles.length > 0) {
      console.log('\n📋 Upload mapping saved to: uploadedAssets.json');
      
      // Save mapping to file
      fs.writeFileSync(
        path.join(process.cwd(), 'uploadedAssets.json'),
        JSON.stringify(uploadedFiles, null, 2)
      );
      
      console.log('\n🔍 Sample uploaded files:');
      uploadedFiles.slice(0, 5).forEach(file => {
        console.log(`  📄 ${file.originalName} → ${file.cloudinaryUrl}`);
      });
      
      if (uploadedFiles.length > 5) {
        console.log(`  ... and ${uploadedFiles.length - 5} more files`);
      }
    }
    
    console.log('\n🌐 Check your Cloudinary dashboard:');
    console.log('  https://cloudinary.com/console');
    console.log('  Media Library > Look for folders:');
    console.log('    📂 products/products (product photos)');
    console.log('    📂 products/hoodies (hoodie photos)'); 
    console.log('    📂 products/shirts (shirt photos)');
    console.log('    📂 assets/designs (design images)');
    console.log('    📂 assets/ui (UI elements)');
    
  } catch (error) {
    console.error('❌ Upload process failed:', error.message);
  }
};

// Ask for confirmation before uploading
console.log('🚀 Asset Upload to Cloudinary');
console.log('='.repeat(50));
console.log('This will upload ALL images from your assets folder to Cloudinary.');
console.log('⚠️  This may take several minutes and will use your Cloudinary quota.');
console.log('💡 You can stop anytime with Ctrl+C');
console.log('');

// Give user 5 seconds to cancel
console.log('⏳ Starting upload in 5 seconds...');
setTimeout(() => {
  uploadAllAssets();
}, 5000);
