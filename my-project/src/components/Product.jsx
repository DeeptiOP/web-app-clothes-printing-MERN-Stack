import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { X, Menu } from "react-feather";
import { useCart } from "./cart";
import { useWishlist } from './WishlistContext.jsx';
import { products } from "./Data";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist: globalWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const product = products.find((item) => item.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Feature states
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [mainImage, setMainImage] = useState(product?.image);

  // Reset state when product changes (for related product navigation)
  useEffect(() => {
    setSelectedColor("blue");
    setSelectedSize("M");
    setQuantity(1);
    setWishlist(false);
    setPincode("");
    setPincodeStatus(null);
    setMainImage(product?.image);
    // eslint-disable-next-line
  }, [id]);
  // Dummy reviews
  const reviews = [
    { name: "Amit", rating: 5, comment: "Great quality!" },
    { name: "Sara", rating: 4, comment: "Nice fit and color." },
    { name: "Sara", rating: 4, comment: "Nice fit and color." },
    { name: "Sara", rating: 4, comment: "Nice fit and color." },
    { name: "Sara", rating: 4, comment: "Nice fit and color." },
  ];
  // Dummy related products
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-bold text-red-500">
        Product Not Found
      </div>
    );
  }
  // Dummy stock
  const inStock = product.stock !== 0;
  // Dummy gallery
  const gallery = [product.image, ...(product.gallery || [])];

  // Social share handler (dummy)
  const handleShare = (platform) => {
    alert(`Share on ${platform}`);
  };

  // Pincode check (dummy logic)
  const checkPincode = () => {
    setPincodeStatus(pincode.length === 6 ? "Available" : "Invalid");
  };

  const isWishlisted = globalWishlist.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center shadow-md h-20 px-4 sticky top-0 text-black bg-blue-950 z-50">
        <div className="text-2xl font-bold text-white">
          <h2 className="text-orange-500 text-3xl">PrinTeeQ</h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-white gap-3 font-bold text-lg">
          <li className="hover:underline underline-offset-8">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline underline-offset-8">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:underline underline-offset-8">
            <Link to="/customize">On Show</Link>
          </li>
          <li className="hover:underline underline-offset-8">
            <Link to="/admin">New Arrivals</Link>
          </li>
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

        {/* Cart */}
        <div className="hidden lg:block text-white">
          <Link to="/cart">
            <FaShoppingCart size={30} />
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex space-x-2">
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
        </div>
        {/* Hamburger Icon */}
        <div
          className="lg:hidden flex gap-5 text-center align-middle text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
          <div className="lg:block text-white">
            <MdAccountCircle size={40} />
          </div>
        </div>

        {/* Profile Icon */}
        <div className="hidden lg:block text-white">
          <MdAccountCircle size={40} />
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-20 right-0 bg-white/10 backdrop-blur-none shadow-md flex flex-col items-center space-y-4 p-10 z-50 lg:hidden">
            <Link to="/" className="font-semibold text-lg">
              Home
            </Link>
            <Link to="/shop" className="font-semibold text-lg">
              Shop
            </Link>
            <Link to="/customize" className="font-semibold text-lg">
              On Show
            </Link>
            <span className="font-semibold text-lg">New Arrivals</span>
            <span className="font-semibold text-lg">Brands</span>
            <div className="flex flex-col items-start w-full justify-center gap-3">
              <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                LOGIN
              </button>
              <button className="bg-white text-blue-950 border border-blue-950 hover:bg-gradient-to-r from-blue-900 to-blue-600 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                SIGN UP
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb */}
      <div className="px-2 md:px-8 lg:px-20 py-2 text-sm text-gray-500 flex gap-2 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <span>/</span>
        <span className="text-blue-600 font-semibold">{product.name}</span>
      </div>

      {/* Product Section */}
      <section className="py-10 px-2 md:px-8 lg:px-20 flex flex-col lg:flex-row gap-10">
        {/* Gallery */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="relative h-[350px] md:h-[400px] lg:h-[600px] bg-gradient-to-br from-white to-blue-50 rounded-2xl overflow-hidden shadow-lg border border-blue-100">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain p-6"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {inStock ? (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow">
                  Out of Stock
                </span>
              )}
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-md shadow">
                New
              </span>
            </div>
            {/* Gallery thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 px-2 py-1 rounded-lg shadow">
              {gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`w-10 h-10 object-cover rounded cursor-pointer border-2 ${
                    mainImage === img ? "border-blue-600" : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
          {/* Social share */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleShare("Facebook")}
              className="text-blue-700 hover:underline"
            >
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare("Twitter")}
              className="text-blue-500 hover:underline"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare("WhatsApp")}
              className="text-green-600 hover:underline"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>

        {/* Product details */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ₹{product.price}
            </span>
            <span className="text-gray-400 text-sm">&lt; PREV NEXT &gt;</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 text-base">{product.description}</p>
          {/* Ratings */}
          <div className="flex items-center gap-1 text-yellow-400 text-lg">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.floor(product.rating || 4)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating || 4})
            </span>
          </div>

          {/* Colors */}
          <div className="flex gap-2 items-center">
            <span className="font-medium">Color:</span>
            {["blue", "white"].map((color) => (
              <button
                key={color}
                className={`w-7 h-7 rounded-full border-2 border-gray-400 shadow-sm cursor-pointer hover:scale-110 transition ${
                  selectedColor === color ? "ring-2 ring-blue-600" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={color}
              ></button>
            ))}
            <span className="ml-2 text-sm text-blue-600 font-semibold">
              {selectedColor}
            </span>
          </div>

          {/* Sizes */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="font-medium">Size:</span>
            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border-2 rounded-full font-semibold text-gray-700 transition ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-blue-200 hover:bg-blue-100"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
            <span className="ml-2 text-sm text-blue-600 font-semibold">
              {selectedSize}
            </span>
          </div>

          {/* Delivery & Pincode */}
          <div className="space-y-2">
            <p className="font-medium text-gray-700">
              Delivery:{" "}
              <span className="font-bold text-blue-600">
                1 TO 3 BUSINESS DAYS
              </span>
            </p>
            <select className="border-2 border-blue-200 rounded-md p-2 w-full focus:outline-none focus:border-blue-400 transition">
              <option>1 to 3 days</option>
              <option>3 to 8 days</option>
            </select>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border-2 border-blue-200 rounded-md p-2 w-40 focus:outline-none focus:border-blue-400 transition"
              />
              <button
                onClick={checkPincode}
                className="bg-blue-600 text-white px-3 py-1 rounded font-semibold"
              >
                Check
              </button>
              {pincodeStatus && (
                <span
                  className={
                    pincodeStatus === "Available"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {pincodeStatus}
                </span>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex gap-4 items-center">
            <div className="flex border-2 border-blue-200 rounded-lg overflow-hidden shadow-sm">
              <button
                className="px-3 font-bold text-blue-600 hover:bg-blue-100 transition"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-12 text-center border-l border-r border-blue-100 focus:outline-none"
              />
              <button
                className="px-3 font-bold text-blue-600 hover:bg-blue-100 transition"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Link to="/cart" className="flex-1">
              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    color: selectedColor,
                    size: selectedSize,
                    quantity,
                  })
                }
                className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-blue-500 transition"
                disabled={!inStock}
              >
                {inStock ? "Add To Cart" : "Out of Stock"}
              </button>
            </Link>
          </div>

          {/* Wishlist & Compare */}
          <div className="flex gap-4 text-gray-600 mt-2">
            {isWishlisted ? (
              <Link to="/wishlist" className="flex items-center gap-1 text-blue-600 font-semibold">
                <span>★</span> Wishlisted (View Wishlist)
              </Link>
            ) : (
              <button
                className="flex items-center gap-1 hover:text-blue-600 transition"
                onClick={() => addToWishlist(product)}
              >
                <span>☆</span> Add to wishlist
              </button>
            )}
            <button className="flex items-center gap-1 hover:text-blue-600 transition">
              <span>⇄</span> Compare
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full px-2 md:px-8 lg:px-20 py-8 border-b bg-white/70">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Customer Reviews
        </h2>
        <div className="space-y-3 gap-3 list-item md:flex flex-wrap md:gap-12 md:justify-around ">
          {reviews.map((r, i) => (
            <div
              key={i}
              className=" bg-blue-50 rounded-lg p-6 flex flex-col md:flex-col md:items-center gap-2 shadow"
            >
              <span className="font-bold text-blue-700">{r.name}</span>
              <span className="flex gap-1 text-yellow-400 text-base">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    className={
                      j < r.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </span>
              <span className="text-gray-700">{r.comment}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section className="w-full px-2 md:px-8 lg:px-20 py-8 border-b bg-white/80">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((rel) => (
            <Link
              to={`/Product/${rel.id}`}
              key={rel.id}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4 border border-blue-100"
            >
              <img
                src={rel.image}
                alt={rel.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg text-blue-700">{rel.name}</h3>
              <p className="text-gray-600">₹{rel.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="w-full px-2 md:px-8 lg:px-20 py-10 border-b">
        <div className="flex flex-wrap justify-center gap-6 font-semibold border-b mb-10 text-lg">
          <button className="pb-2 border-b-2 border-pink-600 text-pink-600">
            Description
          </button>
          <button className="pb-2 text-gray-500 hover:text-pink-600 transition">
            Additional information
          </button>
          <button className="pb-2 text-gray-500 hover:text-pink-600 transition">
            Reviews (0)
          </button>
          <button className="pb-2 text-gray-500 hover:text-pink-600 transition">
            Vendor Info
          </button>
          <button className="pb-2 text-gray-500 hover:text-pink-600 transition">
            More Products
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:px-10 lg:px-32 justify-center gap-10 text-gray-700">
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-bold mb-3 text-pink-700">
              CONSECTETUR A SCELERISQUE
            </h3>
            <p className="mb-3 text-sm">
              Sed risus neque, sagittis sed pellentesque at, pharetra ut nunc.
              Phasellus id enim eget ante pellentesque pharetra. Integer nisl
              dui, efficitur in vopat sodales, tempor sed orci.
            </p>
            <p className="text-sm">Etiam tincidunt dictum eros at porta.</p>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-bold mb-3 text-pink-700">
              IN PHARETRA TURPIS
            </h3>
            <p className="mb-3 text-sm">
              Built around a solid beech frame with legs in polished stainless
              steel.
            </p>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>In pharetra turpis: 65.00 cm</li>
              <li>Aenean pulvinar lorem: 48 colors</li>
              <li>Vestibulum convallis: 2.53 m2</li>
              <li>Esticotine convallis: 8.96 m</li>
            </ul>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-bold mb-3 text-pink-700">
              PELLENTESQUE NEC
            </h3>
            <ul className="list-disc ml-5 text-sm space-y-1 mb-3">
              <li>Sed risus: pharetra ut nunc</li>
              <li>Phasellus id: enim eget ante</li>
              <li>Integer nisl: euismod ipsum</li>
              <li>Interdum: malesuada fames ac ante</li>
            </ul>
            <h3 className="text-lg font-bold mb-3 text-pink-700">
              ETIAM NON AUGUE
            </h3>
            <p className="text-sm">Nullam id pires: 68.00 cm</p>
            <p className="text-sm">Etiam non augue: 86.00 cm</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="flex flex-col md:flex-row justify-evenly py-8 px-2 md:px-8 lg:px-20 bg-white/80 mt-10 gap-8 border-t">
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium text-pink-600">PrinTeeQ</h3>
          <p className="text-md text-gray-600 font-medium">
            printeeq@support.com
          </p>
          <p className="text-md text-gray-600 font-medium">7992662726</p>
          <p className="text-md text-gray-600 font-medium">
            BENGALURU, KARNATAKA
          </p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium text-pink-600">Information</h3>
          <p className="text-md text-gray-600 font-medium">About us</p>
          <p className="text-md text-gray-600 font-medium">Our Blog</p>
          <p className="text-md text-gray-600 font-medium">Start a Return</p>
          <p className="text-md text-gray-600 font-medium">Contact Us</p>
          <p className="text-md text-gray-600 font-medium">Shipping FAQ</p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium text-pink-600">Useful links</h3>
          <p className="text-md text-gray-600 font-medium">My Account</p>
          <p className="text-md text-gray-600 font-medium">Print Provider</p>
          <p className="text-md text-gray-600 font-medium">Become a Partner</p>
          <p className="text-md text-gray-600 font-medium">Custom Products</p>
          <p className="text-md text-gray-600 font-medium">
            Make your own shirt
          </p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium text-pink-600">Newsletter</h3>
          <p className="text-md text-gray-600 font-medium">
            Get the latest news, events and more delivered to your inbox.
          </p>
          <input
            className="h-10 px-5 rounded-lg bg-gray-200 border border-pink-200 focus:outline-none focus:border-pink-400 transition"
            type="text"
            placeholder="your e-mail address"
          />
        </div>
      </section>
    </div>
  );
};

export default Product;
