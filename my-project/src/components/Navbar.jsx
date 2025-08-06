import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { FiMenu as Menu } from 'react-icons/fi';
import { FiX as X } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div>
      <nav className="flex justify-between items-center shadow-md h-20 px-4 sticky top-0 text-black bg-blue-950 z-50">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <h2 className="text-orange-500 text-3xl">PrinTeeQ</h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-white gap-3 font-bold text-lg">
          <li className="hover:underline underline-offset-8"><Link to="/">Home</Link></li>
          <li className="hover:underline underline-offset-8"><Link to="/shop">Shop</Link></li>
          <li className="hover:underline underline-offset-8"><Link to="/customize">On Show</Link></li>
          <li className="hover:underline underline-offset-8"><Link to="/admin">New Arrivals</Link></li>
          <li className="hover:underline underline-offset-8">Brands</li>
        </ul>

        {/* Search Bar */}
        <div className="hidden lg:flex w-auto h-10 bg-white border border-black rounded-3xl px-4 items-center gap-3">
          <IoSearchSharp size={30} />
          <input
            type="text"
            placeholder="Search the Products..."
            className="outline-none bg-transparent placeholder:text-black"
          />
        </div>

        {/* Cart Icon */}
        <div className="hidden lg:block text-white">
          <Link to="/cart">
            <FaShoppingCart size={30} />
          </Link>
        </div>

        {/* Desktop Login / Signup Buttons */}
        <div className="hidden lg:flex space-x-2">
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

        {/* Mobile Menu & Account */}
        <div className="lg:hidden flex gap-5 text-white items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Account Icon */}
          <div>
            <button onClick={() => setIsAccountOpen(!isAccountOpen)}>
              <MdAccountCircle size={40} className="hover:text-purple-700" />
            </button>
            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded z-50">
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-purple-100"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-purple-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-20 right-0 bg-white/10 backdrop-blur-none shadow-md flex flex-col items-center space-y-4 p-10 z-50 lg:hidden">
            <Link to="/" className="font-semibold text-lg">Home</Link>
            <Link to="/shop" className="font-semibold text-lg">Shop</Link>
            <Link to="/customize" className="font-semibold text-lg">On Show</Link>
            <span className="font-semibold text-lg">New Arrivals</span>
            <span className="font-semibold text-lg">Brands</span>
            <div className="flex flex-col items-start w-full gap-3">
              <Link to="/signin">
                <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                  LOGIN
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
