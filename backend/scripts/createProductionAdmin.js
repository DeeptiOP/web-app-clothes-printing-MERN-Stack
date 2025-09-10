import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

// Generate secure random password
const generateSecurePassword = () => {
  const length = 16;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  
  // Ensure at least one character from each required category
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
  password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
  password += '!@#$%^&*()_+-=[]{}|;:,.<>?'[Math.floor(Math.random() * 25)]; // Special char
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

const createProductionAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🍃 Connected to MongoDB');

    // Production admin user details
    const adminData = {
      name: 'System Administrator',
      email: 'admin@printeeq.com', // Production domain
      password: generateSecurePassword(),
      role: 'admin',
      phone: '+1-555-0123',
      isVerified: true,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email');
      console.log('📧 Existing email:', existingAdmin.email);
      console.log('🆔 User ID:', existingAdmin._id);
      console.log('🎯 Role:', existingAdmin.role);
      console.log('📅 Created:', existingAdmin.createdAt);
      process.exit(1);
    }

    // Create admin user
    const admin = await User.create(adminData);
    
    console.log('\n🎉 PRODUCTION ADMIN USER CREATED SUCCESSFULLY!');
    console.log('=' .repeat(60));
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 Name:', adminData.name);
    console.log('🆔 User ID:', admin._id);
    console.log('🎯 Role:', admin.role);
    console.log('📅 Created:', admin.createdAt);
    console.log('=' .repeat(60));
    
    console.log('\n🚨 IMPORTANT SECURITY NOTES:');
    console.log('1. Save these credentials in a secure password manager');
    console.log('2. Change the password after first login');
    console.log('3. Enable 2FA if available');
    console.log('4. Never share these credentials');
    console.log('5. Use HTTPS in production');
    
    console.log('\n🔐 LOGIN INSTRUCTIONS:');
    console.log('1. Go to your application login page');
    console.log('2. Use the email and password above');
    console.log('3. Access admin dashboard at /admin route');
    console.log('4. Change password immediately after first login');
    
    console.log('\n✅ Admin user is ready for production use!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating production admin user:', error.message);
    process.exit(1);
  }
};

createProductionAdmin();




