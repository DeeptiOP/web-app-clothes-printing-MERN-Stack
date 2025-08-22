# Authentication System Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. "useAuth must be used within an AuthProvider" Error

**Problem**: This error occurs when a component tries to use the `useAuth` hook outside of the `AuthProvider` context.

**Solution**: ✅ **FIXED** - The `AuthProvider` now properly wraps the entire application in `App.jsx`.

### 2. Backend Connection Issues

**Problem**: Frontend can't connect to the backend API.

**Solutions**:

#### A. Check if Backend is Running
```bash
# In the backend directory
cd backend
npm start
```

**Expected Output**:
```
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🌐 CORS enabled for: http://localhost:3000, http://localhost:5173, http://localhost:4173
```

#### B. Test Backend Health
Open your browser and go to: `http://localhost:5000/api/health`

**Expected Response**:
```json
{
  "success": true,
  "message": "Server is running!",
  "timestamp": "2024-01-XX..."
}
```

#### C. Check CORS Configuration
The backend now has proper CORS configuration for:
- `http://localhost:3000` (Create React App default)
- `http://localhost:5173` (Vite default)
- `http://localhost:4173` (Vite preview)

### 3. Environment Variable Issues

**Problem**: API URL not configured correctly.

**Solution**: Create a `.env` file in your `my-project` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PrinTeeQ (Dev)
VITE_APP_VERSION=1.0.0
```

**Note**: If you can't create `.env` files, the app will use the default localhost URL.

### 4. Database Connection Issues

**Problem**: Backend can't connect to MongoDB.

**Solution**: Check your backend `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

### 5. JWT Token Issues

**Problem**: Authentication tokens not working properly.

**Solutions**:
- Check if `JWT_SECRET` is set in backend `.env`
- Verify token expiration settings
- Check browser localStorage for stored tokens

## 🔍 Debugging Steps

### Step 1: Check Browser Console
Open Developer Tools (F12) and look for:
- 🔐 AuthProvider logs
- 🌐 API request/response logs
- Any error messages

### Step 2: Test Backend Connection
Run this in your browser console:
```javascript
// Copy and paste the content of test-backend-connection.js
```

### Step 3: Check Network Tab
In Developer Tools → Network tab:
- Look for failed requests to `/api/auth/*`
- Check request/response headers
- Verify CORS headers are present

### Step 4: Verify Environment Variables
In browser console:
```javascript
console.log('Environment:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  PROD: import.meta.env.PROD
});
```

## 🧪 Testing the System

### 1. Start Backend
```bash
cd backend
npm install
npm start
```

### 2. Start Frontend
```bash
cd my-project
npm install
npm run dev
```

### 3. Test Registration
1. Go to `http://localhost:5173/signup`
2. Fill out the form
3. Check console for logs
4. Check Network tab for API calls

### 4. Test Login
1. Go to `http://localhost:5173/signin`
2. Use credentials from registration
3. Check console for logs
4. Verify redirection to home page

## 🐛 Common Error Messages

### "Network error. Please check your internet connection"
- Backend server not running
- Wrong API URL
- Firewall blocking connection

### "Invalid credentials"
- User doesn't exist
- Wrong password
- Database connection issues

### "User already exists with this email"
- Email already registered
- Try different email or go to login

### "Validation error"
- Check form input requirements
- Email format
- Password length (minimum 6 characters)

## 🔧 Backend Troubleshooting

### Check Backend Logs
Look for these messages when starting the server:
```
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🌐 CORS enabled for: http://localhost:3000, http://localhost:5173, http://localhost:4173
```

### Database Connection
Look for:
```
✅ MongoDB connected successfully
```

### Route Registration
Look for:
```
✅ Auth routes registered
✅ Product routes registered
✅ Order routes registered
```

## 🌐 Frontend Troubleshooting

### Check Console Logs
Look for these log prefixes:
- `🔐 AuthProvider:` - Authentication context logs
- `🌐 API:` - API request/response logs
- `🔐 Signin:` - Signin component logs

### Check localStorage
In browser console:
```javascript
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

### Check React DevTools
- Verify `AuthProvider` is present
- Check context values
- Verify component hierarchy

## 📱 Mobile/Responsive Issues

### Check Viewport
Ensure proper viewport meta tag in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Test Different Screen Sizes
Use browser DevTools to test:
- Mobile (375px)
- Tablet (768px)
- Desktop (1024px+)

## 🚀 Production Deployment

### Environment Variables
Set production API URL:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Build and Deploy
```bash
npm run build
# Deploy the 'dist' folder
```

### CORS Configuration
Update backend CORS origins for production:
```javascript
origin: [
  'https://your-frontend-domain.com',
  'https://www.your-frontend-domain.com'
]
```

## 📞 Getting Help

If you're still having issues:

1. **Check the console logs** - Look for 🔐 and 🌐 prefixed messages
2. **Run the test script** - Use `test-backend-connection.js`
3. **Verify backend is running** - Check `http://localhost:5000/api/health`
4. **Check environment variables** - Ensure API URL is correct
5. **Verify CORS configuration** - Backend should allow your frontend origin

## 🔍 Debug Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] Backend health check accessible
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] Database connected
- [ ] JWT secret configured
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls
- [ ] localStorage contains auth data after login

Run through this checklist to identify where the issue is occurring!
