import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

// ✅ Context Setup
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// ✅ Cart Page Component
const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal,
  } = useCart();

  const [address, setAddress] = useState("");
  const [donation, setDonation] = useState(0);

  const totalAmount = getTotal() + donation + 20; // Adding ₹20 Platform Fee

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex flex-col lg:flex-row gap-6">
      {/* Left Cart Section */}
      <div className="w-full lg:w-2/3 space-y-4">
        {/* Address Section */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-2 py-1 text-xs font-semibold">1</span>
            Deliver to:
          </h2>
          <textarea
            className="w-full border-2 border-pink-200 rounded-lg p-2 focus:outline-none focus:border-pink-400 transition"
            rows={3}
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Offers */}
        <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl p-4 shadow border border-pink-200 flex items-center gap-3">
          <span className="text-2xl">🎁</span>
          <div>
            <h2 className="font-bold text-lg mb-1">Available Offers</h2>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-pink-600">10% Instant Discount</span> on HDFC Bank Credit Card EMI on a min spend of ₹3,500.
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 space-y-4">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs font-semibold">2</span>
            Your Cart
          </h1>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-10">
              <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="w-24 h-24 mb-4 opacity-60" />
              <p className="text-xl text-gray-500">Your cart is empty.</p>
              <Link to="/" className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-pink-600 transition">Shop Now</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-xl shadow hover:shadow-xl transition p-3 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover border border-pink-200 shadow-sm"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-lg text-pink-700">{item.name}</h2>
                      <p className="text-gray-700 font-bold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-pink-200 text-pink-700 px-3 rounded-full font-bold text-lg hover:bg-pink-300 transition"
                      >
                        -
                      </button>
                      <span className="font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-pink-200 text-pink-700 px-3 rounded-full font-bold text-lg hover:bg-pink-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xl font-bold bg-white rounded-full shadow p-1"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Summary Section */}
      <div className="w-full lg:w-1/3 space-y-4">
        {/* Coupon */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="inline-block bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs font-semibold">3</span>
            Apply Coupon
          </h2>
          <div className="flex gap-2">
            <input
              className="flex-1 border-2 border-green-200 rounded-lg p-2 mb-2 focus:outline-none focus:border-green-400 transition"
              placeholder="Enter coupon code"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition mb-2">
              Apply
            </button>
          </div>
        </div>

        {/* Donation Section */}
        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-4 shadow border border-yellow-200 space-y-2">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <span className="inline-block bg-yellow-200 text-yellow-700 rounded-full px-2 py-1 text-xs font-semibold">4</span>
            Donate and Make a Difference
          </h2>
          <div className="flex gap-2 flex-wrap">
            {[10, 20, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setDonation(amount)}
                className={`px-3 py-1 rounded-full border font-semibold shadow-sm transition ${
                  donation === amount ? "bg-pink-500 text-white border-pink-500" : "bg-white text-pink-700 border-pink-200 hover:bg-pink-100"
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 space-y-2 text-sm">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs font-semibold">5</span>
            Price Details
          </h2>
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span className="font-semibold">₹{getTotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600 font-semibold">- ₹0</span>
          </div>
          <div className="flex justify-between">
            <span>Donation</span>
            <span className="font-semibold">₹{donation}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span className="font-semibold">₹20</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-pink-600">₹{totalAmount}</span>
          </div>
        </div>

        {/* Place Order */}
        <Link to="/payment">
          <button className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white text-lg py-3 rounded-full font-bold shadow-lg hover:from-pink-600 hover:to-pink-500 transition">
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
