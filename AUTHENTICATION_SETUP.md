# 🔐 Authentication Setup Guide - PrinTeeQ

This guide will help you set up complete authentication functionality for both the backend and frontend of your PrinTeeQ application.

## 🚀 Quick Start

### Backend Setup
1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Run the setup script:**
   ```bash
   node setup.js
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Configure environment variables:**
   - Copy `env.example` to `.env`
   - Update with your actual values

5. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup
1. **Navigate to frontend directory:**
   ```bash
   cd my-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Backend Configuration

### Required Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/printique_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@printique.com

# Client URL (for password reset links)
CLIENT_URL=http://localhost:3000
```

### MongoDB Setup

1. **Install MongoDB** on your system
2. **Start MongoDB service:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Create database:**
   ```bash
   mongosh
   use printique_db
   ```

### Email Configuration

For Gmail (recommended):
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use the app password in your `.env` file

## 🎯 Frontend Configuration

### Authentication Context

The frontend uses React Context for state management:
- `AuthContext.jsx` - Manages authentication state
- `useAuth()` hook - Provides authentication functions
- Automatic token management
- Protected routes

### Protected Routes

Routes that require authentication:
- `/settings` - User account settings
- `/admin` - Admin dashboard (requires admin role)
- `/payment` - Payment processing

### Components

- `Signin.jsx` - User login
- `Signup.jsx` - User registration
- `ForgotPassword.jsx` - Password reset
- `ProtectedRoute.jsx` - Route protection
- `Navbar.jsx` - Authentication-aware navigation

## 🔐 Authentication Features

### User Registration
- Name, email, password validation
- Password confirmation
- Automatic login after registration

### User Login
- Email/password authentication
- JWT token generation
- Persistent sessions

### Password Reset
- Email-based password reset
- Secure token generation
- Time-limited reset links

### Profile Management
- Update user information
- Change password
- Account settings

### Role-Based Access
- User roles (user/admin)
- Protected admin routes
- Middleware-based authorization

## 🛡️ Security Features

- **JWT Tokens** - Secure authentication
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Express-validator
- **CORS Protection** - Cross-origin security
- **Rate Limiting** - API protection
- **Environment Variables** - Secure configuration

## 📱 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `POST /api/auth/logout` - User logout

### Protected Routes
- All routes with `protect` middleware require authentication
- Admin routes require `admin` role
- Automatic token validation

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run dev
# Test API endpoints with Postman or similar
```

### Frontend Testing
```bash
cd my-project
npm run dev
# Test authentication flow in browser
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database exists

2. **JWT Token Invalid**
   - Check `JWT_SECRET` in `.env`
   - Ensure token is sent in Authorization header
   - Verify token hasn't expired

3. **Email Not Sending**
   - Check email credentials in `.env`
   - Verify SMTP settings
   - Check firewall/network settings

4. **Frontend Not Connecting**
   - Verify backend is running on port 5000
   - Check CORS configuration
   - Ensure API base URL is correct

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=*
```

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database
- [Nodemailer](https://nodemailer.com/) - Email service
- [Express Validator](https://express-validator.github.io/) - Input validation

## 🎉 Success!

Once setup is complete, you should have:
- ✅ Working user registration and login
- ✅ Protected routes and admin access
- ✅ Password reset functionality
- ✅ Secure JWT authentication
- ✅ Responsive authentication UI
- ✅ Complete user management system

Your PrinTeeQ application now has enterprise-grade authentication! 🚀 
