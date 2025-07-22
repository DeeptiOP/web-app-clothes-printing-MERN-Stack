import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from './Data';

const ProductListing = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      
      {/* Filter Button on Small Screens */}
      <div className="flex justify-between items-center p-4 lg:hidden">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={() => setShowFilters(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      {/* Desktop - Always visible | Mobile - Slide over */}
      <aside className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white p-6 border-r shadow-md transform transition-transform duration-300 z-50 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:fixed lg:w-1/5 lg:h-screen lg:overflow-y-auto`}>
        
        {/* Close Button on Small Screens */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="text-red-600 font-bold text-lg"
          >
            Close ✖
          </button>
        </div>

        <h2 className="hidden lg:block text-xl font-bold mb-4">Filters</h2>
        
        <input type="text" placeholder="Search products..." className="w-full p-2 border rounded mb-6" />
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Product categories</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Hoodie</li><li>Kids</li><li>Long Sleeves</li><li>Product Designer</li><li>Sweater</li><li>T-Shirt</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by price</h3>
          <input type="range" min="100" max="1000" className="w-full" />
          <button className="mt-2 w-full bg-black text-white py-1 rounded">Filter</button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Color</h3>
          <div className="flex flex-wrap gap-2">
            <span className="w-5 h-5 rounded-full bg-black border"></span>
            <span className="w-5 h-5 rounded-full bg-red-500"></span>
            <span className="w-5 h-5 rounded-full bg-yellow-400"></span>
            <span className="w-5 h-5 rounded-full bg-white border"></span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Size</h3>
          <div className="flex flex-wrap gap-2">
            {["2XL", "3XL", "L", "M", "S", "XL"].map(size => (
              <span key={size} className="px-2 py-1 border rounded text-sm">{size}</span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Material</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Glass</li><li>Metal</li><li>Paper</li><li>Wood</li>
          </ul>
        </div>
      </aside>

      {/* Product Listing */}
      <main className="lg:w-3/4 p-4 lg:ml-[25%]">
        <div className="flex justify-between items-center mb-6">
          <span>Showing {products.length} products</span>
          <select className="border p-2 rounded">
            <option>Default sorting</option>
          </select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <Link to={`/Product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-44 lg:h-64 object-cover" />
              </Link>
              <div className="p-2 lg:p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-700 font-semibold">₹{product.price}</p>
                <div className="text-yellow-400 text-sm">★ ★ ★ ★ ☆</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
