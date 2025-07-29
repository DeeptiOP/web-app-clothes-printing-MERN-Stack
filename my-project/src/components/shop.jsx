import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from './Data';
import { useCart } from "./cart";

const categories = ["Hoodie", "Kids", "Long Sleeves", "Product Designer", "Sweater", "T-Shirt"];
const colors = ["black", "red-500", "yellow-400", "white"];
const sizes = ["2XL", "3XL", "L", "M", "S", "XL"];


const ProductListing = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(1000);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quickView, setQuickView] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    let match = true;
    if (selectedCategory && product.category !== selectedCategory) match = false;
    if (product.price > price) match = false;
    if (selectedColor && product.color !== selectedColor) match = false;
    if (selectedSize && !(product.sizes && product.sizes.includes(selectedSize))) match = false;
    return match;
  });

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
        
        <input type="text" placeholder="Search products..." className="w-full p-2 border rounded mb-6" disabled />
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Product categories</h3>
          <ul className="space-y-1 text-gray-700">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`w-full text-left px-2 py-1 rounded ${selectedCategory === cat ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
            {selectedCategory && (
              <li>
                <button className="text-xs text-red-500 mt-2" onClick={() => setSelectedCategory("")}>Clear Category</button>
              </li>
            )}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by price</h3>
          <input type="range" min="100" max="1000" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full" />
          <div className="text-sm mt-1">Up to ₹{price}</div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full border ${selectedColor === color ? 'ring-2 ring-black' : ''} bg-${color}`}
                style={color === 'white' ? { backgroundColor: '#fff' } : {}}
                onClick={() => setSelectedColor(selectedColor === color ? "" : color)}
                aria-label={color}
              />
            ))}
            {selectedColor && (
              <button className="text-xs text-red-500 ml-2" onClick={() => setSelectedColor("")}>Clear</button>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                className={`px-2 py-1 border rounded text-sm ${selectedSize === size ? 'bg-black text-white' : ''}`}
                onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
              >
                {size}
              </button>
            ))}
            {selectedSize && (
              <button className="text-xs text-red-500 ml-2" onClick={() => setSelectedSize("")}>Clear</button>
            )}
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
          <span>Showing {filteredProducts.length} products</span>
          <select className="border p-2 rounded" disabled>
            <option>Default sorting</option>
          </select>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {filteredProducts.length === 0 && (
            <div className="col-span-4 text-center text-gray-500 py-10">No products found.</div>
          )}
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition relative group">
              <Link to={`/Product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-44 lg:h-64 object-cover" />
              </Link>
              <div className="p-2 lg:p-4 flex flex-col gap-2">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-700 font-semibold">₹{product.price}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={
                      i < Math.floor(product.rating || 4)
                        ? "text-yellow-400"
                        : i < (product.rating || 4)
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }>★</span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.rating || 4})</span>
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    navigate('/cart');
                  }}
                  className="bg-blue-900 text-white px-3 py-1 rounded-full font-semibold mt-2 hover:bg-blue-700 transition w-full"
                >
                  Add to Cart
                </button>
                <button
                  className="text-blue-900 underline text-xs mt-1 hover:text-blue-600"
                  onClick={() => setQuickView(product)}
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Quick View Modal */}
        {quickView && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-[90%] text-center space-y-6 shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
                onClick={() => setQuickView(null)}
              >
                ×
              </button>
              <img src={quickView.image} alt={quickView.name} className="w-48 h-64 object-cover rounded-lg mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{quickView.name}</h2>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={
                    i < Math.floor(quickView.rating || 4)
                      ? "text-yellow-400"
                      : i < (quickView.rating || 4)
                      ? "text-yellow-300"
                      : "text-gray-300"
                  }>★</span>
                ))}
                <span className="text-xs text-gray-500 ml-1">({quickView.rating || 4})</span>
              </div>
              <p className="text-gray-700 mb-2">{quickView.description}</p>
              <span className="text-green-700 font-semibold text-lg">₹{quickView.price}</span>
              <button
                className="bg-blue-900 text-white px-4 py-2 rounded-full font-semibold mt-4 hover:bg-blue-700 transition w-full"
                onClick={() => {
                  addToCart(quickView);
                  setQuickView(null);
                  navigate('/cart');
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListing;
