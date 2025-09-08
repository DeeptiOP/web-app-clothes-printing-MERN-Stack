import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Front from './components/Front';
import Product from './components/Product';
import ProductListing from './components/shop';
import TShirtCustomizer from './components/customize';
import PaymentPage from './components/payment';
import Wishlist from './components/Wishlist';
import { WishlistProvider } from './components/WishlistContext.jsx';
import AccountSettings from './components/AccountSettings';
import CartPage, { CartProvider } from './components/cart';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
// import Layout from './Layout.jsx';// New layout with Navbar
import Layout from './Layout.jsx';
import ThreeDCustomizer from './components/ThreeDCustomizer.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ApiTest from './components/ApiTest';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Front /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/shop', element: <ProductListing /> },
      { path: '/customize', element: <TShirtCustomizer /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/wishlist', element: <Wishlist /> },
      { 
        path: '/settings', 
        element: (
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        ) 
      },
      { 
        path: '/admin', 
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ) 
      },
      { path: '/3dCustomizer', element: <ThreeDCustomizer /> },
    ],
  },
  { path: '/signin', element: <Signin /> },
  { path: '/signup', element: <Signup /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/api-test', element: <ApiTest /> },
  { 
    path: '/payment', 
    element: (
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    ) 
  },
]);

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
