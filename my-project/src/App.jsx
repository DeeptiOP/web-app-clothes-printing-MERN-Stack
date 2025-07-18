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
    errorElement: <div>Something went wrong!</div>,
  },
  {
    path: '/Product/:id',
    element: <MenTshirts />,
    errorElement: <div>Something went wrong!</div>,
  },
  {
    path:'/shop',
    element:<ProductListing/>,
    errorElement: <div>Something went wrong!</div>,
  },
  {
    path:'/customize',
    element:<CustomDesign/>,
    errorElement: <div>Something went wrong!</div>,
  },
  {
    path:'/cart',
    element:<CartPage/>,
    errorElement: <div>Something went wrong!</div>,
  },
  {
    path: '*',
    element: <Front />,
    errorElement: <div>Something went wrong!</div>,
  }
], {
  basename: import.meta.env.DEV ? '' : '/web-app-clothes-printing-MERN-Stack'
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
