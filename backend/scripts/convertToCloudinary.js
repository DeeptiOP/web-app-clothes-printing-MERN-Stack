import fs from 'fs';
import path from 'path';

// Load the uploaded assets mapping
const uploadedAssets = JSON.parse(
  fs.readFileSync('./uploadedAssets.json', 'utf8')
);

// Create a lookup map from filename to Cloudinary URL
const cloudinaryUrls = {};
uploadedAssets.forEach(asset => {
  const filename = asset.originalName.replace('.jpg', '').replace('.png', '');
  cloudinaryUrls[filename] = asset.cloudinaryUrl;
});

console.log('🔄 Converting local image imports to Cloudinary URLs...');
console.log(`📊 Found ${Object.keys(cloudinaryUrls).length} Cloudinary URLs`);

// Path to the React components
const frontendPath = path.join(process.cwd(), '..', 'my-project', 'src');
const dataFilePath = path.join(frontendPath, 'components', 'Data.jsx');

console.log('\n📁 Target file:', dataFilePath);

// Read the current Data.jsx file
if (!fs.existsSync(dataFilePath)) {
  console.error('❌ Data.jsx file not found!');
  process.exit(1);
}

const currentContent = fs.readFileSync(dataFilePath, 'utf8');

console.log('\n🔍 Original imports found:');
let convertedImports = 0;
let newContent = currentContent;

// Create the new Cloudinary-based content
let cloudinaryImportsSection = `// Cloudinary URLs - Generated automatically\nconst cloudinaryImages = {\n`;

// Extract all import statements and convert them
const importRegex = /import\s+(\w+)\s+from\s+"\.\.\/assets\/([^"]+)";/g;
let match;
const imports = [];

while ((match = importRegex.exec(currentContent)) !== null) {
  const [fullMatch, variableName, filePath] = match;
  const fileName = path.basename(filePath, path.extname(filePath));
  
  if (cloudinaryUrls[fileName]) {
    imports.push({
      variableName,
      fileName,
      cloudinaryUrl: cloudinaryUrls[fileName],
      originalImport: fullMatch
    });
    
    console.log(`  ✅ ${variableName} → ${fileName}`);
    convertedImports++;
  } else {
    console.log(`  ⚠️  ${variableName} → ${fileName} (not found in Cloudinary)`);
  }
}

// Build the cloudinary images object
imports.forEach(imp => {
  cloudinaryImportsSection += `  ${imp.variableName}: "${imp.cloudinaryUrl}",\n`;
});

cloudinaryImportsSection += `};\n\n`;

// Remove all the old import statements
let cleanedContent = currentContent;
imports.forEach(imp => {
  cleanedContent = cleanedContent.replace(imp.originalImport + '\n', '');
});

// Add the cloudinary imports section at the top (after any other imports)
const finalContent = cloudinaryImportsSection + cleanedContent;

// Create backup of original file
const backupPath = dataFilePath + '.backup';
fs.writeFileSync(backupPath, currentContent);
console.log(`\n💾 Original file backed up to: ${backupPath}`);

// Write the new content
fs.writeFileSync(dataFilePath, finalContent);

console.log(`\n✅ Conversion complete!`);
console.log(`📊 Converted ${convertedImports} imports to Cloudinary URLs`);
console.log(`📁 Updated file: ${dataFilePath}`);

console.log('\n🎯 Benefits gained:');
console.log('  ✅ Faster loading via CDN');
console.log('  ✅ Automatic image optimization');
console.log('  ✅ Reduced bundle size');
console.log('  ✅ Global image delivery');

console.log('\n🔍 Next steps:');
console.log('  1. Test your frontend to ensure images load correctly');
console.log('  2. Remove the /assets folder from your build if desired');
console.log('  3. Update other components that might use local images');

// Show sample of converted code
console.log('\n📋 Sample conversion:');
console.log('Before:');
console.log('  import product1 from "../assets/product1.jpg";');
console.log('After:');
console.log('  const cloudinaryImages = {');
console.log(`    product1: "${cloudinaryUrls['product1']}",`);
console.log('  };');
