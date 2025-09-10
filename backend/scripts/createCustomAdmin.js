import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user input
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createCustomAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🍃 Connected to MongoDB');

    console.log('\n🔐 CUSTOM ADMIN CREATION WIZARD');
    console.log('=' .repeat(50));

    // Get admin details from user
    const name = await question('👤 Enter admin full name: ');
    const email = await question('📧 Enter admin email: ');
    const password = await question('🔑 Enter admin password (min 8 chars, must include uppercase, lowercase, number, special char): ');
    const phone = await question('📱 Enter phone number (optional, press Enter to skip): ');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      process.exit(1);
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log('❌ Password must be at least 8 characters and contain uppercase, lowercase, number, and special character');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email');
      console.log('📧 Existing email:', existingAdmin.email);
      console.log('🆔 User ID:', existingAdmin._id);
      process.exit(1);
    }

    // Create admin user
    const adminData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'admin',
      phone: phone.trim() || undefined,
      isVerified: true,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true
    };

    const admin = await User.create(adminData);
    
    console.log('\n🎉 CUSTOM ADMIN USER CREATED SUCCESSFULLY!');
    console.log('=' .repeat(60));
    console.log('👤 Name:', adminData.name);
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('📱 Phone:', adminData.phone || 'Not provided');
    console.log('🆔 User ID:', admin._id);
    console.log('🎯 Role:', admin.role);
    console.log('📅 Created:', admin.createdAt);
    console.log('=' .repeat(60));
    
    console.log('\n🚨 SECURITY REMINDERS:');
    console.log('1. Save these credentials securely');
    console.log('2. Change password after first login');
    console.log('3. Enable 2FA if available');
    console.log('4. Use strong, unique passwords');
    console.log('5. Never share admin credentials');
    
    console.log('\n✅ Your custom admin is ready!');
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating custom admin user:', error.message);
    rl.close();
    process.exit(1);
  }
};

createCustomAdmin();




