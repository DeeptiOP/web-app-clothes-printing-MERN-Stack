# Backend & Frontend Integration Testing Guide

## Step 1: Test Backend Standalone

### 1.1 Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🍃 MongoDB Connected: localhost
```

### 1.2 Test Backend Endpoints

**Option A: Use Browser**
Open these URLs in your browser:
- `http://localhost:5000/api/health` - Should show server status
- `http://localhost:5000/api/products` - Should show products list

**Option B: Use Test Script**
```bash
# In backend directory
node test-backend.js
```

**Option C: Use Postman or Thunder Client (VS Code)**
Test these endpoints:
- GET `http://localhost:5000/api/health`
- GET `http://localhost:5000/api/products`
- POST `http://localhost:5000/api/auth/register`

### 1.3 Seed Database (if empty)
```bash
cd backend
npm run seed
```

## Step 2: Update Frontend to Use Backend

### 2.1 Install Axios in Frontend
```bash
cd my-project
npm install axios
```

### 2.2 Create API Configuration

Create `my-project/src/api/config.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2.3 Create API Service Functions

Create `my-project/src/api/products.js`:
```javascript
import api from './config';

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/featured/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category, params = {}) => {
  try {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};
```

Create `my-project/src/api/auth.js`:
```javascript
import api from './config';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
```

### 2.4 Update Data Component

Update `my-project/src/components/Data.jsx`:
```javascript
import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';

// Remove the old static data import
// import data from '../db.json';

const Data = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return products;
};

export default Data;
```

## Step 3: Test Integration

### 3.1 Start Both Servers
**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd my-project
npm run dev
```

### 3.2 Check Browser Console
1. Open your React app in browser (usually `http://localhost:5173`)
2. Open Developer Tools (F12)
3. Check Console tab for any errors
4. Check Network tab to see API calls

### 3.3 Expected Results
- Frontend loads without errors
- Products display (from backend API, not db.json)
- Network tab shows successful API calls to `localhost:5000`

## Step 4: Common Issues & Solutions

### Issue 1: CORS Errors
**Symptom:** Browser console shows CORS policy errors

**Solution:** Backend is already configured for CORS, but if issues persist, update `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue 2: Connection Refused
**Symptom:** "Failed to fetch" or "Connection refused"

**Solutions:**
1. Ensure backend server is running on port 5000
2. Check if MongoDB is running
3. Verify no firewall blocking the connection

### Issue 3: Empty Products
**Symptom:** Products array is empty

**Solutions:**
1. Run database seeding: `npm run seed`
2. Check MongoDB connection
3. Verify products exist in database

### Issue 4: Authentication Issues
**Symptom:** 401 Unauthorized errors

**Solutions:**
1. Clear localStorage: `localStorage.clear()`
2. Re-login to get fresh token
3. Check JWT_SECRET in backend .env

## Step 5: Frontend Component Updates

### Update Product Component
Replace static data usage in your components:

**Before:**
```javascript
import data from '../db.json';
const products = data.men_tshirts;
```

**After:**
```javascript
import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProducts({ category: 'Men' });
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
```

## Step 6: Testing Checklist

- [ ] Backend server starts without errors
- [ ] MongoDB connects successfully
- [ ] Health endpoint returns success
- [ ] Products endpoint returns data
- [ ] Frontend loads without console errors
- [ ] Products display from backend (not static data)
- [ ] Network tab shows successful API calls
- [ ] Authentication works (register/login)
- [ ] Cart functionality works with backend
- [ ] No CORS errors in browser console

## Quick Debug Commands

**Check if backend is running:**
```bash
netstat -an | findstr :5000
```

**Test backend directly:**
```bash
# In backend directory
node test-backend.js
```

**Check frontend API calls:**
Open browser Developer Tools → Network tab → Refresh page

## Next Steps After Integration

1. **Add Authentication UI** - Connect login/register forms
2. **Implement Cart Backend** - Connect cart operations
3. **Add Order Processing** - Implement checkout flow
4. **Error Handling** - Add proper error boundaries
5. **Loading States** - Improve user experience
6. **Testing** - Add proper test cases

---

If you encounter any issues, check the browser console and network tab first. The most common issues are CORS, server not running, or MongoDB connection problems.
