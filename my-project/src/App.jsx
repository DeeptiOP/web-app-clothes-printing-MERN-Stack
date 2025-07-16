import React from 'react';
import Front from './components/Front';
import Product from './components/Product';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />,
  },
  {
    path: '/product/',
    element: <Product />,
  },
], {
  basename: '/web-app-clothes-printing-MERN-Stack'
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
