import api from './config';

/**
 * Get all products with optional filters (pagination, sorting)
 * @param {Object} params
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get a single product by ID
 * @param {string} id
 */
export const getProduct = async (id) => {
  if (!id) throw new Error('Product ID is required');
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error.response?.data || error;
  }
};

/**
 * Search products
 * @param {string} query
 */
export const searchProducts = async (query) => {
  if (!query) throw new Error('Search query is required');
  try {
    const response = await api.get('/products/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    throw error.response?.data || error;
  }
};

/**
 * Get products by category
 * @param {string} category
 * @param {Object} params
 */
export const getProductsByCategory = async (category, params = {}) => {
  if (!category) throw new Error('Category is required');
  try {
    const response = await api.get(`/products/by-category/${category}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category "${category}":`, error);
    throw error.response?.data || error;
  }
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/featured/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error.response?.data || error;
  }
};
