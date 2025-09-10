import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const updateUserToAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the user by email and update role to admin
    const email = 'admin@clothesprinting.com';
    
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { 
        role: 'admin',
        isVerified: true
      },
      { new: true }
    );

    if (updatedUser) {
      console.log('✅ User role updated successfully!');
      console.log('User details:', {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified
      });
    } else {
      console.log('❌ User not found with email:', email);
    }

  } catch (error) {
    console.error('❌ Error updating user role:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

updateUserToAdmin();
