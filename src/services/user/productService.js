import api from '../../utils/api';

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
