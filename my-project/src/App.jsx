import React from 'react';
import Front from './components/Front';
import MenTshirts from './components/Product';
import ProductListing from './components/shop';
import CustomDesign from './components/customize';
import CartPage from './components/cart';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />,
  },
  {
    path: '/Product/:id',
    element: <MenTshirts />,
  },
  {
    path:'/shop',
    element:<ProductListing/>
  },
  {
    path:'/customize',
    element:<CustomDesign/>
  },
  {
    path:'/cart',
    element:<CartPage/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
