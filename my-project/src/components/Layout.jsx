import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBox from './Chatbox';

export default function Layout() {
  const location = useLocation();

  // Hide Navbar on login/signup and payment  pages
  const hideNavbarRoutes = ['/signin', '/signup', '/payment'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
      <ChatBox/>
    </>
  );
}