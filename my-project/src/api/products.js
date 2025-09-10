import api from './config';

// Get all products
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response?.data || error;
  }
};

// Get single product by ID
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error.response?.data || error;
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await api.get('/products/search', { 
      params: { q: query } 
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error.response?.data || error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get('/products', { 
      params: { category } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error.response?.data || error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products', { 
      params: { featured: true } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error.response?.data || error;
  }
};