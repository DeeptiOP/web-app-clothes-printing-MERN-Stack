import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProducts } from "../api/products";

// Filters
const categories = ["Hoodie", "Kids", "Long Sleeves", "Product Designer", "Sweater", "T-Shirt"];
const colors = ["black", "red", "yellow", "white"];
const sizes = ["2XL", "3XL", "L", "M", "S", "XL"];

// Tailwind color mapping
const colorMap = {
  black: "bg-black",
  red: "bg-red-500",
  yellow: "bg-yellow-400",
  white: "bg-white border",
};

// Cloudinary base
const CLOUDINARY_BASE = "https://res.cloudinary.com/dwryce3zm/image/upload/";

// Get image URL (Cloudinary or fallback)
export const getImage = (url) => {
  if (!url) return "/placeholder.png";
  return url.startsWith("http") ? url : CLOUDINARY_BASE + url;
};

const ProductListing = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(1000);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        if (response.success) setProducts(response.data);
        else setError(response.message || "Failed to load products");
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.subcategory !== selectedCategory) return false;
    if (p.price > price) return false;
    if (selectedColor && !p.colors?.some((c) => c.name.toLowerCase() === selectedColor)) return false;
    if (selectedSize && !p.sizes?.some((s) => s.name === selectedSize)) return false;
    return true;
  });

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar Filters */}
      <aside
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white p-6 border-r shadow-md transform transition-transform duration-300 z-50 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-1/5`}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setShowFilters(false)} className="text-red-600 font-bold">✖</button>
        </div>

        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="mb-4">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-2 py-1 rounded ${
                  selectedCategory === cat ? "bg-black text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold mb-2">Price</h3>
        <input
          type="range"
          min="100"
          max="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full mb-2"
        />
        <div className="mb-4">Up to ₹{price}</div>

        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex gap-2 mb-4">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-5 h-5 rounded-full ${colorMap[color]} ${
                selectedColor === color ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setSelectedColor(selectedColor === color ? "" : color)}
            />
          ))}
        </div>

        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-2 py-1 border rounded text-sm ${selectedSize === size ? "bg-black text-white" : ""}`}
              onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
            >
              {size}
            </button>
          ))}
        </div>
      </aside>

      {/* Product Grid */}
      <main className="lg:w-3/4 p-4 lg:ml-[25%]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 && (
            <div className="col-span-4 text-center text-gray-500 py-10">No products found.</div>
          )}
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition relative group"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={getImage(product.images?.[0]?.url)}
                  alt={product.name}
                  className="w-full h-44 lg:h-64 object-cover"
                  loading="lazy"
                />
              </Link>
              <div className="p-2 flex flex-col gap-2">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-700 font-semibold">₹{product.price}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(product.rating?.average || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating?.average?.toFixed(1) || 0})
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={async () => {
                    if (!user) {
                      alert("You must be logged in to add items to the cart!");
                      navigate("/signin");
                      return;
                    }
                    const result = await addToCart({
                      id: product._id,
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      image: getImage(product.images?.[0]?.url),
                      quantity: 1,
                      size: product.sizes?.[0]?.name || "M",
                      color: product.colors?.[0] || { name: "default", code: "#000000" },
                    });
                    if (result.success) alert("Added to cart!");
                  }}
                  className="bg-blue-900 text-white px-3 py-1 rounded-full font-semibold mt-2 hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
