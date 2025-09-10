# Authentication System Setup Guide

## Overview
This guide explains how to set up and use the authentication system in the PrinTeeQ web application.

## Features
- User registration and login
- JWT token-based authentication
- Protected routes
- Form validation
- Error handling
- Loading states
- Responsive design

## Backend Requirements
Make sure your backend server is running and has the following endpoints:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Required Environment Variables
Create a `.env` file in your backend directory:
```env
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
```

## Frontend Setup

### 1. Environment Configuration
Create environment files for different environments:

#### Development (env.development)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PrinTeeQ (Dev)
VITE_APP_VERSION=1.0.0
```

#### Production (env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=PrinTeeQ
VITE_APP_VERSION=1.0.0
```

### 2. API Configuration
The API configuration automatically detects the environment and uses the appropriate base URL.

### 3. Authentication Context
The `AuthContext` provides authentication state throughout the application:
- User information
- Login/logout functions
- Loading states
- Error handling

### 4. Protected Routes
Use the `ProtectedRoute` component to protect pages that require authentication:

```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

## Usage Examples

### Login Component
```jsx
import { useAuth } from '../context/AuthContext';

const { login, error, loading } = useAuth();

const handleSubmit = async (credentials) => {
  try {
    await login(credentials);
    // Redirect or show success message
  } catch (error) {
    // Error is handled by the context
  }
};
```

### Registration Component
```jsx
import { useAuth } from '../context/AuthContext';

const { register, error, loading } = useAuth();

const handleSubmit = async (userData) => {
  try {
    await register(userData);
    // Redirect or show success message
  } catch (error) {
    // Error is handled by the context
  }
};
```

### Checking Authentication Status
```jsx
import { useAuth } from '../context/AuthContext';

const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log('User is logged in:', user.name);
}
```

## Form Validation
Both login and registration forms include:
- Required field validation
- Email format validation
- Password length validation
- Password confirmation matching
- Real-time error clearing

## Error Handling
The system provides comprehensive error handling:
- Network errors
- Validation errors
- Server errors
- Authentication errors

## Security Features
- JWT token storage in localStorage
- Automatic token expiration handling
- Secure logout functionality
- Protected route redirection

## Testing the System

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend
```bash
cd my-project
npm install
npm run dev
```

### 3. Test Registration
1. Navigate to `/signup`
2. Fill out the registration form
3. Submit and verify user is created

### 4. Test Login
1. Navigate to `/signin`
2. Use the credentials from registration
3. Verify successful login and redirection

### 5. Test Protected Routes
1. Try to access `/settings` without authentication
2. Verify redirection to login page
3. Login and verify access to protected routes

## Troubleshooting

### Common Issues

#### 1. CORS Errors
Make sure your backend has CORS properly configured:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

#### 2. API Connection Issues
- Verify the backend is running
- Check the API URL in environment files
- Ensure network connectivity

#### 3. JWT Token Issues
- Check JWT_SECRET in backend environment
- Verify token expiration settings
- Check token storage in localStorage

#### 4. Form Validation Errors
- Ensure all required fields are filled
- Check email format
- Verify password length requirements

## Production Deployment

### 1. Update Environment Variables
Set the correct production API URL in your deployment platform.

### 2. Build the Application
```bash
npm run build
```

### 3. Deploy
Deploy the `dist` folder to your hosting platform.

### 4. Verify
Test all authentication flows in production environment.

## Support
If you encounter issues:
1. Check the browser console for errors
2. Verify backend server status
3. Check environment variable configuration
4. Ensure all dependencies are installed

## Dependencies
Make sure these packages are installed:
- `axios` - HTTP client
- `react-router-dom` - Routing
- `react` - React framework
