import api from './config';

/**
 * Get all products with optional filters.
 * @param {Object} params - Optional query parameters (category, featured, page, limit, etc.)
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
 * @param {string} id - Product ID
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
 * Search products by query
 * @param {string} query - Search term
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
 * @param {string} category - Category name
 */
export const getProductsByCategory = async (category) => {
  if (!category) throw new Error('Category is required');
  try {
    const response = await api.get('/products', { params: { category } });
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
    const response = await api.get('/products', { params: { featured: true } });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error.response?.data || error;
  }
};
