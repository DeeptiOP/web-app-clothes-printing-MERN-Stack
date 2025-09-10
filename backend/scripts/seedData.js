import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected for seeding');
  seedDatabase();
});

// Load environment variables
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected for seeding');
    await seedDatabase();
    process.exit();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

main();


// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    // Example product data
    const products = [
      {
        name: 'Classic White T-Shirt',
        description: 'Soft cotton fabric, perfect for everyday wear.',
        price: 599,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ url: '/assets/product1.jpg', alt: 'Classic White T-Shirt' }],
        sizes: [
          { name: 'S', stock: 10 },
          { name: 'M', stock: 15 },
          { name: 'L', stock: 20 }
        ],
        colors: [
          { name: 'White', code: '#ffffff' }
        ],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Black Graphic Tee',
        description: 'Trendy black tee with vibrant anime graphic print.',
        price: 799,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ url: '/assets/product2.jpg', alt: 'Black Graphic Tee' }],
        sizes: [
          { name: 'M', stock: 15 },
          { name: 'L', stock: 10 },
          { name: 'XL', stock: 5 }
        ],
        colors: [
          { name: 'Black', code: '#000000' }
        ],
        isActive: true
      }
    ];

    // Insert example data into database
    await Product.insertMany(products);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}


