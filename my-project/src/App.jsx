import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Front from './components/Front';
import Product from './components/Product';
import ProductListing from './components/shop';
import TShirtCustomizer from './components/customize';
import PaymentPage from './components/payment';
import Wishlist from './components/Wishlist';
import { WishlistProvider } from './components/WishlistContext.jsx';
import { AuthProvider } from './context/AuthContext';
import AccountSettings from './components/AccountSettings';
import CartPage, { CartProvider } from './components/cart';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout.jsx';
import ThreeDCustomizer from './components/ThreeDCustomizer.jsx';

const ChatBox = React.lazy(() => import('./components/Chatbox'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Front /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/shop', element: <ProductListing /> },
      { path: '/customize', element: <TShirtCustomizer /> },
      { 
        path: '/cart', 
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: '/wishlist', 
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ) 
      },
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
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ) 
      },
      { path: '/3dCustomizer', element: <ThreeDCustomizer /> },
      { 
        path: '/signin', 
        element: (
          <ProtectedRoute requireAuth={false}>
            <Signin />
          </ProtectedRoute>
        ) 
      },
      { 
        path: '/signup', 
        element: (
          <ProtectedRoute requireAuth={false}>
            <Signup />
          </ProtectedRoute>
        ) 
      },
      { 
        path: '/payment', 
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Suspense fallback={<div>Loading...</div>}>
            <ChatBox />
          </Suspense>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
