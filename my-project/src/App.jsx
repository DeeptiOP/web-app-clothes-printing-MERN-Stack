import React from 'react';
import Front from './components/Front';
import Product from './components/Product';
import ProductListing from './components/shop';
import TShirtCustomizer from './components/customize';
import PaymentPage from './components/payment';
import CartPage, { CartProvider } from './components/cart';  // ✅ Import both CartPage and CartProvider
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';




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
  }
], {
  basename: import.meta.env.PROD ? '/web-app-clothes-printing-MERN-Stack' : ''
});

function App() {
  return (
    <CartProvider> {/* ✅ Wrap RouterProvider inside CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
