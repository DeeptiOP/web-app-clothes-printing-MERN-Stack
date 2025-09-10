import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../api/config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  // Fetch cart from API
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/cart');
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (itemData) => {
    if (!isAuthenticated) {
      setError('Please login to add items to cart');
      return { success: false, message: 'Please login to add items to cart' };
    }

    try {
      setLoading(true);
      setError(null);

      const cartItem = {
        productId: itemData.id || itemData._id,
        quantity: itemData.quantity || 1,
        size: itemData.size,
        color: itemData.color,
        customization: itemData.customization
      };

      const response = await api.post('/cart/add', cartItem);
      
      if (response.data.success) {
        setCart(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated) return { success: false, message: 'Please login' };

    try {
      setLoading(true);
      setError(null);

      const response = await api.put(`/cart/update/${itemId}`, { quantity });
      
      if (response.data.success) {
        setCart(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update quantity';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return { success: false, message: 'Please login' };

    try {
      setLoading(true);
      setError(null);

      const response = await api.delete(`/cart/remove/${itemId}`);
      
      if (response.data.success) {
        setCart(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to remove item';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!isAuthenticated) return { success: false, message: 'Please login' };

    try {
      setLoading(true);
      setError(null);

      const response = await api.delete('/cart/clear');
      
      if (response.data.success) {
        setCart(response.data.data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to clear cart';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get cart item count
  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart total
  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartCount,
    getCartTotal,
    setError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};




