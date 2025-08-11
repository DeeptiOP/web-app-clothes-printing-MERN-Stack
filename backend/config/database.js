import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔒 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });
    
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.log('⚠️  Continuing without database connection for testing...');
  }
};

export default connectDB;
