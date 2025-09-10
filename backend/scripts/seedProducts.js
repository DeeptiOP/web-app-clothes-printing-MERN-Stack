import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

// Load environment variables
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected for product seeding');
    await seedProducts();
    process.exit();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

// Seed function for products
async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Create comprehensive product data based on frontend Data.jsx
    const products = [
      {
        productId: 'PRD-20250107-001',
        sku: 'MEN-TSH-BLK-M-DEF-001',
        name: 'Classic Black T-Shirt',
        description: 'Soft cotton fabric, perfect for everyday wear. Classic black color that goes with everything.',
        price: 599,
        originalPrice: 799,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ 
          url: '/assets/t_shirt1.jpg', 
          publicId: 't_shirt1',
          alt: 'Classic Black T-Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 10 },
          { name: 'M', stock: 15 },
          { name: 'L', stock: 20 },
          { name: 'XL', stock: 15 },
          { name: 'XXL', stock: 10 }
        ],
        colors: [
          { name: 'Black', code: '#000000' }
        ],
        isActive: true,
        isFeatured: true,
        totalStock: 70
      },
      {
        productId: 'PRD-20250107-002',
        sku: 'MEN-TSH-BRN-M-DEF-002',
        name: 'Brown Cotton T-Shirt',
        description: 'Comfortable brown cotton t-shirt with modern fit.',
        price: 599,
        originalPrice: 799,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ 
          url: '/assets/t_shirt1brown.jpg', 
          publicId: 't_shirt1brown',
          alt: 'Brown Cotton T-Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 8 },
          { name: 'M', stock: 12 },
          { name: 'L', stock: 18 },
          { name: 'XL', stock: 12 },
          { name: 'XXL', stock: 8 }
        ],
        colors: [
          { name: 'Brown', code: '#8B4513' }
        ],
        isActive: true,
        totalStock: 58
      },
      {
        productId: 'PRD-20250107-003',
        sku: 'MEN-TSH-GRN-M-DEF-003',
        name: 'Green Granite T-Shirt',
        description: 'Unique green granite color t-shirt with premium quality.',
        price: 699,
        originalPrice: 899,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ 
          url: '/assets/t_shirt1granitegreen.jpg', 
          publicId: 't_shirt1granitegreen',
          alt: 'Green Granite T-Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 6 },
          { name: 'M', stock: 10 },
          { name: 'L', stock: 15 },
          { name: 'XL', stock: 10 },
          { name: 'XXL', stock: 6 }
        ],
        colors: [
          { name: 'Green', code: '#228B22' }
        ],
        isActive: true,
        totalStock: 47
      },
      {
        productId: 'PRD-20250107-004',
        sku: 'MEN-TSH-DGR-M-DEF-004',
        name: 'Dark Green T-Shirt',
        description: 'Rich dark green t-shirt with excellent color retention.',
        price: 599,
        originalPrice: 799,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ 
          url: '/assets/t_shirt1green.jpg', 
          publicId: 't_shirt1green',
          alt: 'Dark Green T-Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 7 },
          { name: 'M', stock: 11 },
          { name: 'L', stock: 16 },
          { name: 'XL', stock: 11 },
          { name: 'XXL', stock: 7 }
        ],
        colors: [
          { name: 'Dark Green', code: '#006400' }
        ],
        isActive: true,
        totalStock: 52
      },
      {
        productId: 'PRD-20250107-005',
        sku: 'MEN-TSH-WHT-M-DEF-005',
        name: 'Pure White T-Shirt',
        description: 'Crisp white t-shirt perfect for customization and printing.',
        price: 499,
        originalPrice: 699,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ 
          url: '/assets/t_shirtwhite.jpg', 
          publicId: 't_shirtwhite',
          alt: 'Pure White T-Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 12 },
          { name: 'M', stock: 18 },
          { name: 'L', stock: 25 },
          { name: 'XL', stock: 18 },
          { name: 'XXL', stock: 12 }
        ],
        colors: [
          { name: 'White', code: '#FFFFFF' }
        ],
        isActive: true,
        isFeatured: true,
        totalStock: 85
      },
      {
        productId: 'PRD-20250107-006',
        sku: 'MEN-TSH-PUR-M-DEF-006',
        name: 'Purple Cotton T-Shirt',
        description: 'Vibrant purple t-shirt with soft cotton feel.',
        price: 599,
        originalPrice: 799,
        category: 'Men',
        subcategory: 'T-Shirts',
        images: [{ 
          url: '/assets/t_shirtpurple.jpg', 
          publicId: 't_shirtpurple',
          alt: 'Purple Cotton T-Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 5 },
          { name: 'M', stock: 8 },
          { name: 'L', stock: 12 },
          { name: 'XL', stock: 8 },
          { name: 'XXL', stock: 5 }
        ],
        colors: [
          { name: 'Purple', code: '#800080' }
        ],
        isActive: true,
        totalStock: 38
      },
      {
        productId: 'PRD-20250107-007',
        sku: 'MEN-HOD-BLK-M-DEF-007',
        name: 'Classic Hoodie',
        description: 'Warm and comfortable hoodie perfect for casual wear.',
        price: 1299,
        originalPrice: 1599,
        category: 'Men',
        subcategory: 'Hoodies',
        images: [{ 
          url: '/assets/hoodie.jpg', 
          publicId: 'hoodie',
          alt: 'Classic Hoodie' 
        }],
        sizes: [
          { name: 'S', stock: 8 },
          { name: 'M', stock: 12 },
          { name: 'L', stock: 15 },
          { name: 'XL', stock: 12 },
          { name: 'XXL', stock: 8 }
        ],
        colors: [
          { name: 'Black', code: '#000000' }
        ],
        isActive: true,
        isFeatured: true,
        totalStock: 55
      },
      {
        productId: 'PRD-20250107-008',
        sku: 'MEN-OVS-GRY-M-DEF-008',
        name: 'Oversized Sweater',
        description: 'Trendy oversized sweater with modern fit.',
        price: 999,
        originalPrice: 1299,
        category: 'Men',
        subcategory: 'Oversized',
        images: [{ 
          url: '/assets/os.jpg', 
          publicId: 'os',
          alt: 'Oversized Sweater' 
        }],
        sizes: [
          { name: 'M', stock: 6 },
          { name: 'L', stock: 10 },
          { name: 'XL', stock: 8 },
          { name: 'XXL', stock: 6 }
        ],
        colors: [
          { name: 'Gray', code: '#808080' }
        ],
        isActive: true,
        totalStock: 30
      },
      {
        productId: 'PRD-20250107-009',
        sku: 'MEN-FSL-BLU-M-DEF-009',
        name: 'Full Sleeve Shirt',
        description: 'Professional full sleeve shirt for formal occasions.',
        price: 899,
        originalPrice: 1199,
        category: 'Men',
        subcategory: 'Full Sleeve',
        images: [{ 
          url: '/assets/fs.jpg', 
          publicId: 'fs',
          alt: 'Full Sleeve Shirt' 
        }],
        sizes: [
          { name: 'S', stock: 5 },
          { name: 'M', stock: 8 },
          { name: 'L', stock: 12 },
          { name: 'XL', stock: 8 },
          { name: 'XXL', stock: 5 }
        ],
        colors: [
          { name: 'Blue', code: '#0000FF' }
        ],
        isActive: true,
        totalStock: 38
      }
    ];

    // Insert products into database
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${createdProducts.length} products`);

    // Log product IDs for reference
    console.log('Product IDs created:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}: ${product._id}`);
    });

  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

main();
