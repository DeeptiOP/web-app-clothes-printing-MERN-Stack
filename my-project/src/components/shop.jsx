import { useEffect, useState } from 'react';
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";
import product6 from "../assets/product6.jpg";
import product7 from "../assets/product7.jpg";
import product8 from "../assets/product8.jpg";
import product9 from "../assets/product9.jpg";
import product10 from "../assets/product10.jpg";
import product11 from "../assets/product11.jpg";
import product12 from "../assets/product12.jpg";
import product13 from "../assets/product13.jpg";
import product14 from "../assets/product14.jpg";
import product15 from "../assets/product15.jpg";
import product16 from "../assets/product16.jpg";
import product17 from "../assets/product17.jpg";
import product18 from "../assets/product18.jpg";
import product19 from "../assets/product19.jpg";
import product20 from "../assets/product20.jpg";
import { Link } from 'react-router-dom';

const products = [
  {
      "id": 1,
      "name": "Classic White T-Shirt",
      "category": "Men",
      "price": 599,
      "image": product1,
      "description": "Soft cotton fabric, perfect for everyday wear."
    },
    {
      "id": 2,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product2,
      "description": "Trendy black tee with vibrant anime graphic print."
    },
    {
      "id": 3,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product3,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 4,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product4,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 5,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product5,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 6,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product6,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 7,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product7,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 8,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product8,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 9,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product9,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 10,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product10,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 11,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product11,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 12,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product12,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 13,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product13,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 14,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product14,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 15,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product15,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 16,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product16,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 17,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product17,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 18,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product18,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 19,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product19,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 20,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": product20,
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 21,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/fs.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 22,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/fs1.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 23,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 24,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie1.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 24,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie2.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 25,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie3.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 26,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie4.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 27,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie5.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 28,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie6.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 29,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie7.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 30,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie8.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 31,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie9.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 32,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/hoodie10.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 33,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 34,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os1.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 35,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os2.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 36,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os3.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 37,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os4.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 38,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os5.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 39,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os6.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 40,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os7.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 41,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os8.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 42,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os9.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 43,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/os10.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 44,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/pic2.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 45,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/pic3.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 46,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/pic4.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 47,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/pic5.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 48,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/pic6.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 49,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/pic7.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 50,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 51,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print1.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 52,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print2.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 53,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print3.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 54,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print4.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 55,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print5.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 56,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print6-i.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 57,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print6-ii.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 58,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print6.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    },
    {
      "id": 59,
      "name": "Black Graphic Tee",
      "category": "Men",
      "price": 799,
      "image": "/assets/print11.jpg",
      "description": "Trendy black tee with vibrant anime graphic print."  
    }
];

const ProductListing = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-gray-50 min-h-screen border-r fixed left-0 top-0 h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Search</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded mb-6"
        />

        {/* Filters */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Product categories</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Hoodie</li>
            <li>Kids</li>
            <li>Long Sleeves</li>
            <li>Product Designer</li>
            <li>Sweater</li>
            <li>T-Shirt</li>
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
            {["2XL", "3XL", "L", "M", "S", "XL"].map((size) => (
              <span key={size} className="px-2 py-1 border rounded text-sm">{size}</span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by Material</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Glass</li>
            <li>Metal</li>
            <li>Paper</li>
            <li>Wood</li>
          </ul>
        </div>
      </aside>

      {/* Product Listing */}
      <main className="w-3/4 p-6 ml-[25%]">
        <div className="flex justify-between items-center mb-6">
          <span>Showing {products.length} products</span>
          <select className="border p-2 rounded">
            <option>Default sorting</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <Link to={`/Product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Sale</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{product.name}</h3>
                <p className="text-gray-700 mb-2">₹{product.price}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">★ ★ ★ ★ ☆</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
