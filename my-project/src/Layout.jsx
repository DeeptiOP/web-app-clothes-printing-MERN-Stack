import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBox from './components/Chatbox';

export default function Layout() {
  const location = useLocation();

  // Hide Navbar and ChatBox on login/signup, payment, and 3D customization pages
  const hideNavbarRoutes = ['/signin', '/signup', '/payment', '/3dCustomizer'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
      {!shouldHideNavbar && <ChatBox />}
    </>
  );
}