import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { FiMenu as Menu } from 'react-icons/fi';
import { FiX as X } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Example: redirect to a search results page
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
    navigate('/');
  };

  return (
    <div className='bg-[#090138]/55 backdrop-blur-md text-[#c9d1d9] shadow-blue-700 sticky z-50 top-0'>
      <nav className="w-full sticky top-0 bg-[#090138]/80 backdrop-blur-md z-50 border-b border-[#021f48] py-2">
        {/* Desktop & Mobile Row */}
        <div className="flex items-center justify-between h-16 px-3 sm:px-6 lg:px-10 w-full">
          {/* Logo */}
          <h2 className="text-orange-500 text-2xl sm:text-3xl font-bold">PrinTeeQ</h2>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center flex-1 justify-between ml-8">
            {/* Menu */}
            <ul className="flex space-x-8 gap-3 font-bold text-lg">
              <li className="hover:underline underline-offset-8 hover:text-[#58b4ff] transition"><Link to="/">Home</Link></li>
              <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition"><Link to="/shop">Shop</Link></li>
              <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition"><Link to="/3dCustomizer">On Show</Link></li>
              <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition">Brands</li>
              {/* Admin Dashboard Link - Only visible to admins */}
              {isAuthenticated && user?.role === 'admin' && (
                <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition">
                  <Link to="/admin" className="text-yellow-400 hover:text-yellow-300">Admin</Link>
                </li>
              )}
            </ul>
            {/* Search Bar */}
            <div className="w-auto h-10 bg-[#01012b] border border-[#015f76] rounded-3xl px-4 items-center gap-3 shadow-inner flex mx-6">
              <IoSearchSharp
                size={30}
                className="cursor-pointer"
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Search the Products..."
                className="outline-none bg-transparent placeholder:text-[#8b949e] text-[#c9d1d9]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </div>
            {/* Cart */}
            <Link to="/cart" className="mx-2 relative">
              <FaShoppingCart size={30} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            {/* Authentication Buttons */}
            {!isAuthenticated ? (
              <div className="flex space-x-2 mx-2">
                <Link to="/signin">
                  <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-3 py-2 rounded-3xl font-semibold">
                    LOGIN
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-3 py-2 rounded-3xl font-semibold">
                    SIGN UP
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mx-2">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.name || 'User'}
                </span>
              </div>
            )}
            {/* Account Icon - Only show if authenticated */}
            {isAuthenticated && (
              <button
                aria-label="Account"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="focus:outline-none mx-2"
              >
                <MdAccountCircle
                  size={32}
                  className="text-[#c9d1d9] hover:text-purple-700"
                />
              </button>
            )}
            {isAccountOpen && isAuthenticated && (
              <div className="absolute right-3 top-16 w-40 bg-[#050034] border border-[#30363d] shadow-md rounded z-50">
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-400 hover:bg-[#21262d]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* Mobile Icons */}
          <div className="lg:hidden flex gap-2 items-center">
            <button
              aria-label="Open menu"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setIsAccountOpen(false);
              }}
              className="focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {isAuthenticated && (
              <button
                aria-label="Account"
                onClick={() => {
                  setIsAccountOpen(!isAccountOpen);
                  setMenuOpen(false);
                }}
                className="focus:outline-none"
              >
                <MdAccountCircle
                  size={32}
                  className="text-[#c9d1d9] hover:text-purple-700"
                />
              </button>
            )}
            {isAccountOpen && isAuthenticated && (
              <div className="absolute right-3 top-16 w-40 bg-[#050034] border border-[#30363d] shadow-md rounded z-50">
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-400 hover:bg-[#21262d]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-[#161b22]/95 flex flex-col items-center space-y-6 pt-20 z-[100] lg:hidden overflow-y-auto w-full">
            <Link to="/" className="font-semibold text-lg hover:text-[#58a6ff]" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="font-semibold text-lg hover:text-[#58a6ff]" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/customize" className="font-semibold text-lg hover:text-[#58a6ff]" onClick={() => setMenuOpen(false)}>On Show</Link>
            <span className="font-semibold text-lg hover:text-[#58a6ff]">Brands</span>
            {/* Admin Dashboard Link - Only visible to admins */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="font-semibold text-lg text-yellow-400 hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
            )}
            <div className="w-11/12 h-10 bg-[#01012b] border border-[#015f76] rounded-3xl px-3 flex items-center gap-2 shadow-inner">
              <IoSearchSharp size={22} />
              <input
                type="text"
                placeholder="Search the Products..."
                className="outline-none bg-transparent placeholder:text-[#8b949e] text-[#c9d1d9] w-full"
              />
            </div>
            <Link to="/cart" className="font-semibold text-lg hover:text-[#58a6ff] relative" onClick={() => setMenuOpen(false)}>
              <FaShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            {/* Mobile Authentication Buttons */}
            {!isAuthenticated ? (
              <div className="flex flex-col items-center w-full gap-2">
                <Link to="/signin" className="w-full" onClick={() => setMenuOpen(false)}>
                  <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-3 py-2 rounded-3xl font-semibold w-full">
                    LOGIN
                  </button>
                </Link>
                <Link to="/signup" className="w-full" onClick={() => setMenuOpen(false)}>
                  <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-3 py-2 rounded-3xl font-semibold w-full">
                    SIGN UP
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full gap-2">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.name || 'User'}
                </span>
                <Link to="/settings" className="w-full" onClick={() => setMenuOpen(false)}>
                  <button className="bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 px-3 py-2 rounded-3xl font-semibold w-full">
                    Account Settings
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 text-white border border-red-700 hover:bg-red-700 px-3 py-2 rounded-3xl font-semibold w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
