import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MdDelete, MdAdd, MdRemove, MdShoppingCart } from 'react-icons/md';

const CartPage = () => {
  const { cart, loading, error, updateQuantity, removeFromCart, clearCart, getCartCount, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId);
    } else {
      setLocalLoading(true);
      const result = await updateQuantity(itemId, newQuantity);
      if (!result.success) {
        alert(result.message);
      }
      setLocalLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      setLocalLoading(true);
      const result = await removeFromCart(itemId);
      if (!result.success) {
        alert(result.message);
      }
      setLocalLoading(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      setLocalLoading(true);
      const result = await clearCart();
      if (!result.success) {
        alert(result.message);
      }
      setLocalLoading(false);
    }
  };

  const handleCheckout = () => {
    if (getCartCount() === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/payment');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
          <Link 
            to="/signin" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading || localLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <MdShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/shop" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
            </span>
            {cart.items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cart.items.map((item) => (
                <div key={item._id} className="border-b border-gray-200 last:border-b-0">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product?.images?.[0] || '/api/placeholder/150/150'}
                          alt={item.product?.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {item.product?.name || 'Custom Product'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Size: {item.size} | Color: {item.color?.name || 'Default'}
                        </p>
                        {item.customization?.hasCustomization && (
                          <p className="text-blue-600 text-sm">
                            Custom Design: {item.customization.text || 'Image Design'}
                          </p>
                        )}
                        <p className="text-lg font-bold text-blue-600 mt-2">
                          ₹{item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition"
                          disabled={localLoading}
                        >
                          <MdRemove className="w-5 h-5" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition"
                          disabled={localLoading || item.quantity >= 10}
                        >
                          <MdAdd className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                        disabled={localLoading}
                      >
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₹50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{(getCartTotal() * 0.18).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">₹{(getCartTotal() + 50 + (getCartTotal() * 0.18)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
                disabled={localLoading}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;




