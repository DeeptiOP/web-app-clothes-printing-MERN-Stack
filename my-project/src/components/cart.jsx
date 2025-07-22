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
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-6">
      {/* Left Cart Section */}
      <div className="w-full lg:w-2/3 space-y-4">
        {/* Address Section */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="font-bold text-lg mb-2">Deliver to:</h2>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Offers */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="font-bold text-lg mb-2">Available Offers</h2>
          <p className="text-sm text-gray-600">
            ✅ 10% Instant Discount on HDFC Bank Credit Card EMI on a min spend
            of ₹3,500.
          </p>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-xl">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p>₹{item.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 px-3 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 px-3 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-bold"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Summary Section */}
      <div className="w-full lg:w-1/3 space-y-4">
        {/* Coupon */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="font-bold text-lg mb-2">Apply Coupon</h2>
          <input
            className="w-full border rounded p-2 mb-2"
            placeholder="Enter coupon code"
          />
          <button className="w-full bg-pink-500 text-white py-2 rounded">
            Apply
          </button>
        </div>

        {/* Donation Section */}
        <div className="bg-white rounded-lg p-4 shadow space-y-2">
          <h2 className="font-bold text-lg">Donate and Make a Difference</h2>
          <div className="flex gap-2">
            {[10, 20, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setDonation(amount)}
                className={`px-3 py-1 rounded ${
                  donation === amount ? "bg-pink-500 text-white" : "bg-gray-200"
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white rounded-lg p-4 shadow space-y-2 text-sm">
          <h2 className="font-bold text-lg">Price Details</h2>
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹{getTotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">- ₹0</span>
          </div>
          <div className="flex justify-between">
            <span>Donation</span>
            <span>₹{donation}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>₹20</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Place Order */}
        <Link to="/payment">
          <button className="w-full bg-pink-500 text-white text-lg py-3 rounded font-bold">
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
