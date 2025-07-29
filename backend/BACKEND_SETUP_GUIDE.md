# Complete Backend Setup Guide

## Overview

I've successfully created a full-featured Node.js/Express backend for your clothes printing MERN stack application. The backend includes:

- **Authentication & Authorization** with JWT tokens
- **Product Management** with categories, sizes, colors, and customization
- **Shopping Cart** functionality
- **Order Management** system
- **User Management** with admin controls
- **MongoDB** database with Mongoose ODM

## What's Been Created

### Directory Structure
```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   ├── User.js              # User schema with authentication
│   ├── Product.js           # Product schema with customization
│   ├── Cart.js              # Shopping cart schema
│   └── Order.js             # Order management schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product CRUD operations
│   ├── cart.js              # Cart management
│   ├── orders.js            # Order processing
│   └── users.js             # User management (admin)
├── scripts/
│   └── seedData.js          # Database seeding script
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # API documentation
```

## Quick Start

### 1. Install MongoDB

**Option A: Install MongoDB locally**
- Download from https://www.mongodb.com/try/download/community
- Follow installation instructions for Windows
- Start MongoDB service

**Option B: Use MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/atlas
- Create a free account and cluster
- Get connection string

### 2. Update Environment Variables

Edit `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clothes-printing-db  # or your Atlas connection string
JWT_SECRET=your_very_secure_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
```

### 3. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Start development server
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Test the API

Visit `http://localhost:5000/api/health` to verify the server is running.

### 5. Seed Database (Optional)

```bash
cd backend
npm run seed
```

This creates:
- An admin user: `admin@example.com` / `admin123`
- Sample products

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products (supports filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `DELETE /api/cart/remove/:itemId` - Remove item (requires auth)

### Orders
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)

## Example API Usage

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

## Connecting Frontend to Backend

Update your React frontend to use the API:

### 1. Install Axios (if not already installed)
```bash
cd my-project
npm install axios
```

### 2. Create API configuration file
Create `my-project/src/api/config.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 3. Create API service functions
Create `my-project/src/api/products.js`:
```javascript
import api from './config';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
```

### 4. Update React components to use API
Instead of importing from db.json, use the API:
```javascript
import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## Database Schema

### User Model
- Authentication (email, password)
- Profile info (name, phone, address)
- Role-based access (user/admin)

### Product Model
- Basic info (name, description, price)
- Categories and subcategories
- Multiple images
- Size and color variants with stock
- Customization options

### Cart Model
- User-specific carts
- Product references with quantities
- Customization details

### Order Model
- Complete order lifecycle
- Payment and shipping info
- Status tracking

## Features

### Authentication & Security
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization

### Product Management
- Full CRUD operations
- Category and subcategory filtering
- Search functionality
- Image management
- Stock tracking

### Shopping Cart
- Persistent cart storage
- Product customization support
- Quantity management
- Cart total calculations

### Order Processing
- Order creation and validation
- Stock management
- Order status tracking
- Admin order management

## Next Steps

1. **Test the API**: Use Postman or curl to test all endpoints
2. **Update Frontend**: Replace static data with API calls
3. **Add Authentication**: Implement login/register in React
4. **Add Cart Features**: Connect cart functionality to backend
5. **Implement Orders**: Add checkout and order management

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Or kill process using port 5000

3. **JWT Token Issues**
   - Update JWT_SECRET in `.env`
   - Clear localStorage in browser

4. **CORS Errors**
   - Backend is configured for `http://localhost:5173` (Vite default)
   - Update CORS settings in `server.js` if needed

### MongoDB Setup Help

If you need help setting up MongoDB:
- **Local**: Follow MongoDB Community Edition installation guide
- **Cloud**: Use MongoDB Atlas free tier
- **Alternative**: Use MongoDB Docker container

## Production Considerations

When deploying to production:
1. Use environment variables for all secrets
2. Enable HTTPS
3. Set up proper CORS origins
4. Configure MongoDB with authentication
5. Set up logging and monitoring
6. Implement rate limiting
7. Add API documentation (Swagger)

The backend is now fully functional and ready to power your clothes printing e-commerce application!
