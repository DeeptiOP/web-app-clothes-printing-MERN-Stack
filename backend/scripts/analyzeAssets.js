import fs from 'fs';
import path from 'path';

// Path to your assets folder
const ASSETS_PATH = path.join(process.cwd(), '..', 'my-project', 'src', 'assets');

// Analyze assets without uploading
const analyzeAssets = () => {
  try {
    console.log('📋 Analyzing your local assets...');
    console.log('📂 Assets folder:', ASSETS_PATH);
    console.log('');
    
    // Check if assets folder exists
    if (!fs.existsSync(ASSETS_PATH)) {
      console.log('❌ Assets folder not found:', ASSETS_PATH);
      return;
    }
    
    // Read all files in assets folder
    const files = fs.readdirSync(ASSETS_PATH);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    });
    
    console.log(`📊 Found ${imageFiles.length} image files in your assets folder`);
    console.log('');
    
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
      tank: [], // st files
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
    
    // Display detailed breakdown
    console.log('🗂️  File Categories:');
    console.log('═'.repeat(80));
    
    let totalFiles = 0;
    let totalSizeMB = 0;
    
    Object.entries(categories).forEach(([category, files]) => {
      if (files.length === 0) return;
      
      console.log(`\n📂 ${category.toUpperCase()} (${files.length} files):`);
      console.log('─'.repeat(50));
      
      let categorySize = 0;
      
      files.forEach((file, index) => {
        const filePath = path.join(ASSETS_PATH, file);
        const stats = fs.statSync(filePath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        categorySize += parseFloat(sizeMB);
        
        if (index < 5) { // Show first 5 files
          console.log(`  📄 ${file} (${sizeMB} MB)`);
        }
      });
      
      if (files.length > 5) {
        console.log(`  ... and ${files.length - 5} more files`);
      }
      
      console.log(`  💾 Category total: ${categorySize.toFixed(2)} MB`);
      
      totalFiles += files.length;
      totalSizeMB += categorySize;
    });
    
    console.log('\n' + '═'.repeat(80));
    console.log('📊 SUMMARY:');
    console.log('═'.repeat(80));
    console.log(`📁 Total files: ${totalFiles}`);
    console.log(`💾 Total size: ${totalSizeMB.toFixed(2)} MB`);
    console.log(`🔗 Files are currently: LOCAL (not in Cloudinary)`);
    
    console.log('\n❓ What these categories represent:');
    console.log('  📂 products: General product photos (product1.jpg, t_shirt variants)');
    console.log('  📂 hoodies: Hoodie product images (hoodie1.jpg - hoodie10.jpg)');
    console.log('  📂 shirts: Shirt product images (shirt.jpg - shirt13.jpg)');
    console.log('  📂 oversized: Oversized clothing (os.jpg - os10.jpg)');
    console.log('  📂 fullsleeve: Full sleeve items (fs.jpg, fs1.jpg)');
    console.log('  📂 tank: Tank tops/sleeveless (st.jpg - st9.jpg)');
    console.log('  📂 designs: Design templates (design1.jpg - design22.jpg)');
    console.log('  📂 prints: Print patterns (print.jpg - print11.jpg)');
    console.log('  📂 ui: UI elements (banner, cart, search icons, etc.)');
    
    console.log('\n🚀 Next steps:');
    console.log('  1. To upload all to Cloudinary: node scripts/uploadAllAssets.js');
    console.log('  2. To check what\'s in Cloudinary: node scripts/listCloudinaryFiles.js');
    console.log('  3. Visit Cloudinary dashboard: https://cloudinary.com/console');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
  }
};

analyzeAssets();
