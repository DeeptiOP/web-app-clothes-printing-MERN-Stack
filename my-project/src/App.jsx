import React, { Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Front from './components/Front';
import Product from './components/Product';
import ProductListing from './components/shop';
import TShirtCustomizer from './components/customize';
import PaymentPage from './components/payment';
import Wishlist from './components/Wishlist';
import { WishlistProvider } from './components/WishlistContext.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AccountSettings from './components/AccountSettings';
import CartPage from './components/CartPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Layout from './Layout.jsx';
import ThreeDCustomizer from './components/ThreeDCustomizer.jsx';

const ChatBox = React.lazy(() => import('./components/Chatbox'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔴 Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
            >
              Reload Page
            </button>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Use createHashRouter instead of createBrowserRouter for GitHub Pages compatibility
const router = createHashRouter([
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
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
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
    <ErrorBoundary>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
