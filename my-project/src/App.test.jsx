import React from 'react';
import Front from './components/Front';
import Product from './components/Product';
import ProductListing from './components/shop';
import TShirtCustomizer from './components/customize';
import PaymentPage from './components/payment';
import CartPage, { CartProvider } from './components/cart';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';

// Hash router for testing - no basename needed
const router = createHashRouter([
  {
    path: '/',
    element: <Front />,
    errorElement: <div>Error loading home page</div>
  },
  {
    path: '/Product/:id',
    element: <Product />,
    errorElement: <div>Error loading product page</div>
  },
  {
    path:'/shop',
    element:<ProductListing/>,
    errorElement: <div>Error loading shop page</div>
  },
  {
    path:'/customize',
    element:<TShirtCustomizer/>,
    errorElement: <div>Error loading customize page</div>
  },
  {
    path:'/cart',
    element:<CartPage/>,
    errorElement: <div>Error loading cart page</div>
  },
  {
    path:'/payment',
    element:<PaymentPage/>,
    errorElement: <div>Error loading payment page</div>
  },
  {
    path:'/Signup',
    element:<Signup/>,
    errorElement: <div>Error loading signup page</div>
  },
  {
    path:'/Signin',
    element:<Signin/>,
    errorElement: <div>Error loading signin page</div>
  },
  {
    path:'*',
    element:<div style={{padding: '20px', textAlign: 'center'}}>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <p>Current path: {window.location.pathname}</p>
      <p>Current hash: {window.location.hash}</p>
      <a href="#/">Go to Home</a>
    </div>
  }
]);

function TestApp() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default TestApp;
