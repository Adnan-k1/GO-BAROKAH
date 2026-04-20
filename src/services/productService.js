import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ngrokHeaders = {
  'ngrok-skip-browser-warning': 'true',
  'Accept': 'application/json'
};

export const productService = {
  getAllProducts: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/api/products`, {
        params,
        headers: ngrokHeaders
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`, {
        headers: ngrokHeaders
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};