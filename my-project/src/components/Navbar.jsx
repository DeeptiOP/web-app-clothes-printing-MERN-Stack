import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { FiMenu as Menu } from 'react-icons/fi';
import { FiX as X } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { user, isAuthenticated, signout } = useAuth();

  const handleLogout = () => {
    signout();
    setMenuOpen(false);
    setIsAccountOpen(false);
  };

  return (
    <div className='bg-[#090138]/55 backdrop-blur-md text-[#c9d1d9] shadow-blue-700 sticky z-50 top-0'>
      <nav className="flex justify-between items-center shadow-md h-20 px-4 sticky top-0 text-[#c9d1d9] bg-[#090138]/15 backdrop-blur-md z-50 border-b border-[#021f48]">
              <div className="text-2xl font-bold text-[#c9d1d9]">
                <h2 className="text-orange-500 text-3xl">PrinTeeQ</h2>
              </div>
              {/* Desktop Menu */}
              <ul className="hidden lg:flex space-x-8 gap-3 font-bold text-lg">
                <li className="hover:underline underline-offset-8 hover:text-[#58b4ff] transition"><Link to="/">Home</Link></li>
                <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition"><Link to="/shop">Shop</Link></li>
                <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition"><Link to="/3dCustomizer">On Show</Link></li>
                <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition"><Link to="/admin">New Arrivals</Link></li>
                <li className="hover:underline underline-offset-8 hover:text-[#58a6ff] transition">Brands</li>
              </ul>
              {/* Search Bar */}
              <div className="hidden lg:flex w-auto h-10 bg-[#01012b] border border-[#015f76] rounded-3xl px-4 items-center gap-3 shadow-inner">
                <IoSearchSharp size={30} />
                <input
                  type="text"
                  placeholder="Search the Products..."
                  className="outline-none bg-transparent placeholder:text-[#8b949e] text-[#c9d1d9]"
                />
              </div>
              {/* Cart */}
              <div className="hidden lg:block">
                <Link to="/cart">
                  <FaShoppingCart size={30} />
                </Link>
              </div>
              {/* Authentication Buttons */}
              <div className="hidden lg:flex space-x-2">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-[#c9d1d9]">Welcome, {user?.name}</span>
                    <div className="relative">
                      <button onClick={() => setIsAccountOpen(!isAccountOpen)}>
                        <MdAccountCircle
                          size={40}
                          className="text-2xl text-[#c9d1d9] hover:text-purple-700"
                        />
                      </button>
                      {isAccountOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#010737] border border-[#01607b] shadow-md rounded z-50">
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
                            onClick={() => setIsAccountOpen(false)}
                          >
                            Account Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#21262d]"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-1">
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
                )}
              </div>
              {/* Hamburger Icon */}
              <div
                className="lg:hidden flex gap-5 text-center align-middle text-[#c9d1d9]"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={32} /> : <Menu size={32} />}
                {/* Account Icon */}
                <div>
                  <button onClick={() => {
                    setIsAccountOpen(!isAccountOpen);
                    setMenuOpen(false);
                  }}>
                    <MdAccountCircle
                      size={40}
                      className="text-2xl text-[#c9d1d9] hover:text-purple-700"
                    />
                  </button>
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#050034] border border-[#30363d] shadow-md rounded z-50">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 text-[#c9d1d9] border-b border-[#30363d]">
                            Welcome, {user?.name}
                          </div>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
                            onClick={() => setIsAccountOpen(false)}
                          >
                            Account Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#21262d]"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/signin"
                            className="block px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
                            onClick={() => setIsAccountOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="block px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
                            onClick={() => setIsAccountOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Mobile Menu */}
              {menuOpen && (
                <div className="absolute top-20 right-0 bg-[#161b22]/95 shadow-md flex flex-col items-center space-y-4 p-10 z-50 lg:hidden border-l border-[#30363d]">
                  <Link to="/" className="font-semibold text-lg hover:text-[#58a6ff]">Home</Link>
                  <Link to="/shop" className="font-semibold text-lg hover:text-[#58a6ff]">Shop</Link>
                  <Link to="/customize" className="font-semibold text-lg hover:text-[#58a6ff]">On Show</Link>
                  <span className="font-semibold text-lg hover:text-[#58a6ff]">New Arrivals</span>
                  <span className="font-semibold text-lg hover:text-[#58a6ff]">Brands</span>
                  {isAuthenticated ? (
                    <div className="flex flex-col items-start w-full justify-center gap-3">
                      <span className="text-[#c9d1d9] text-sm">Welcome, {user?.name}</span>
                      <Link to="/settings" className="w-full">
                        <button className="w-full bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                          ACCOUNT
                        </button>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white border border-red-700 hover:bg-red-700 px-4 py-2 rounded-3xl font-semibold"
                      >
                        LOGOUT
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start w-full justify-center gap-3">
                      <Link to="/signin" className="w-full">
                        <button className="w-full bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                          LOGIN
                        </button>
                      </Link>
                      <Link to="/signup" className="w-full">
                        <button className="w-full bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                          SIGN UP
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </nav>
    </div>
  );
}
