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

// GitHub Pages basename for production
const basename = import.meta.env.PROD ? '/web-app-clothes-printing-MERN-Stack' : '';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading home page. Please refresh.</div>
  },
  {
    path: '/Product/:id',
    element: <Product />,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading product page. Please refresh.</div>
  },
  {
    path:'/shop',
    element:<ProductListing/>,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading shop page. Please refresh.</div>
  },
  {
    path:'/customize',
    element:<TShirtCustomizer/>,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading customize page. Please refresh.</div>
  },
  {
    path:'/cart',
    element:<CartPage/>,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading cart page. Please refresh.</div>
  },
  {
    path:'/payment',
    element:<PaymentPage/>,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading payment page. Please refresh.</div>
  },
  {
    path:'/Signup',
    element:<Signup/>,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading signup page. Please refresh.</div>
  },
  {
    path:'/Signin',
    element:<Signin/>,
    errorElement: <div style={{padding: '20px', color: 'red'}}>Error loading signin page. Please refresh.</div>
  },
  {
    path:'*',
    element:<div style={{padding: '20px', textAlign: 'center'}}>
      <h2>🚀 Debug Info</h2>
      <p>Current URL: {window.location.href}</p>
      <p>Pathname: {window.location.pathname}</p>
      <p>Search: {window.location.search}</p>
      <p>Hash: {window.location.hash}</p>
      <p>Basename: {basename}</p>
      <p><strong>If you see this, React Router is working but route not found.</strong></p>
      <a href={basename + '/'} style={{color: 'blue'}}>Go to Home</a>
    </div>
  }
], {
  basename: basename
});

function App() {
  return (
    <CartProvider> {/* ✅ Wrap RouterProvider inside CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
