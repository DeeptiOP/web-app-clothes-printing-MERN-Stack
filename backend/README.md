# Clothes Printing Backend API

A full-featured Node.js/Express backend for a clothes printing e-commerce application with MongoDB database.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations for products with categories, sizes, colors, and customization options
- **Shopping Cart**: Persistent cart functionality with customization support
- **Order Management**: Complete order lifecycle from creation to delivery tracking
- **User Management**: User profiles, admin panel for user management
- **Database**: MongoDB with Mongoose ODM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update the values:
   ```bash
   # Update the MongoDB URI and JWT secret
   MONGODB_URI=mongodb://localhost:27017/clothes-printing-db
   JWT_SECRET=your_secret_key_here
   ```

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/categories/list` - Get all categories
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/category/:category` - Get products by category

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart
- `GET /api/cart/count` - Get cart item count

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - Get user statistics

## Database Models

### User
- Name, email, password
- Role (user/admin)
- Profile information (phone, address)
- Verification status

### Product
- Basic info (name, description, price)
- Category and subcategory
- Images array
- Available sizes with stock
- Available colors
- Customization options
- Rating and reviews
- SEO fields

### Cart
- User reference
- Items array with product references
- Quantity and customization details
- Auto-calculated totals

### Order
- User and items references
- Shipping and billing addresses
- Payment information
- Order status and tracking
- Timeline of status changes

## Technologies Used

- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Environment Variables
See `.env` file for all required environment variables.

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Role-based access control
- Error handling middleware
- CORS configuration

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}, // Response data
  "pagination": {} // For paginated responses
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Custom application errors
