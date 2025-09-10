import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🍃 Connected to MongoDB');

    // Admin user details
    const adminData = {
      name: 'Admin User',
      email: 'admin@clothesprinting.com', // Change this to your desired admin email
      password: 'Admin@123456', // Change this to a strong password
      role: 'admin',
      phone: '+1234567890',
      isVerified: true
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email');
      process.exit(1);
    }

    // Create admin user
    const admin = await User.create(adminData);
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 User ID:', admin._id);
    console.log('🎯 Role:', admin.role);

    console.log('\n🚀 You can now login to the admin panel with these credentials');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdmin();
