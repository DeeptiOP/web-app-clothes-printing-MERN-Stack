import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function Layout() {
  const location = useLocation();

  // Hide Navbar on login/signup, payment, and 3D customization pages
  const hideNavbarRoutes = ['/signin', '/signup', '/payment', '/3dCustomizer'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}