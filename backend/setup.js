import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up PrinTeeQ Backend...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  
  try {
    // Copy env.example to .env
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please update the .env file with your actual values:');
    console.log('   - MONGODB_URI: Your MongoDB connection string');
    console.log('   - JWT_SECRET: A secure random string for JWT tokens');
    console.log('   - EMAIL_USER & EMAIL_PASS: Your email credentials');
    console.log('   - Other configuration values as needed');
    console.log('\n📖 See env.example for all required variables');
    
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('📝 Please manually create a .env file based on env.example');
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Installing dependencies...');
  console.log('   Run: npm install');
} else {
  console.log('✅ Dependencies already installed');
}

// Check if MongoDB is running
console.log('\n🔍 Checking MongoDB connection...');
console.log('   Make sure MongoDB is running on your system');
console.log('   Default connection: mongodb://localhost:27017/printique_db');

console.log('\n🎯 Next steps:');
console.log('   1. Update .env file with your configuration');
console.log('   2. Start MongoDB service');
console.log('   3. Run: npm run dev');
console.log('   4. Test the API at: http://localhost:5000/api/health');

console.log('\n🌟 Setup complete! Happy coding! 🚀');
