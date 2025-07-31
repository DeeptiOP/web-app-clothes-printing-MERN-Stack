import React from 'react';
import Front from './components/Front';
import Product from './components/Product';
import ProductListing from './components/shop';
import TShirtCustomizer from './components/customize';
import PaymentPage from './components/payment';
import Wishlist from './components/Wishlist';
import { WishlistProvider } from './components/WishlistContext.jsx';
import AccountSettings from './components/AccountSettings'; // ✅ Import AccountSettings
import CartPage, { CartProvider } from './components/cart';  // ✅ Import both CartPage and CartProvider
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AdminDashboard from './components/AdminDashboard'; // ✅ Import AdminDashboard




const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />,
  },
  {
    path: '/Product/:id',
    element: <Product />,
  },
  {
    path:'/shop',
    element:<ProductListing/>
  },
  {
    path:'/customize',
    element:<TShirtCustomizer/>
  },
  {
    path:'/cart',
    element:<CartPage/>
  },
  {
    path:'/payment',
    element:<PaymentPage/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
  {
    path:'/Signin',
    element:<Signin/>
  },
  {
    path:'/admin',
    element:<AdminDashboard/>
  },
  {
    path:'/settings',
    element:<AccountSettings/>
  },
  {
    path:'/wishlist',
    element:<Wishlist/>
  }

]);

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
