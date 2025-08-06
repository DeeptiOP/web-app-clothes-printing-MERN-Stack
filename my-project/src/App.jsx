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
import AdminDashboard from './components/AdminDashboard';
import Layout from './Layout..jsx';// New layout with Navbar

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
      { path: '/settings', element: <AccountSettings /> },
      { path: '/admin', element: <AdminDashboard /> },
    ],
  },
  { path: '/signin', element: <Signin /> },
  { path: '/signup', element: <Signup /> },
  { path: '/payment', element: <PaymentPage /> },
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
