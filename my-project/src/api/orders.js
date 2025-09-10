import api from './config';

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error.response?.data || error;
  }
};

// Get order by ID
export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error.response?.data || error;
  }
};

// Get user's orders
export const getUserOrders = async (params = {}) => {
  try {
    const response = await api.get('/orders', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error.response?.data || error;
  }
};

// Cancel order
export const cancelOrder = async (orderId, reason) => {
  try {
    const response = await api.put(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error.response?.data || error;
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (orderId, statusData) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, statusData);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error.response?.data || error;
  }
};

// Get order tracking info
export const getOrderTracking = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/tracking`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order tracking:', error);
    throw error.response?.data || error;
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (params = {}) => {
  try {
    const response = await api.get('/orders/admin', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error.response?.data || error;
  }
};

// Get order statistics (Admin only)
export const getOrderStats = async () => {
  try {
    const response = await api.get('/orders/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    throw error.response?.data || error;
  }
};

