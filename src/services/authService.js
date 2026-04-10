import axios from "axios";

const API_URL = 'https://joziah-unqualifiable-undesirably.ngrok-free.dev';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token || token === 'undefined' || token === 'null') {
    return { 'ngrok-skip-browser-warning': 'true' };
  }
  return {
    Authorization: `Bearer ${token.trim()}`,
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Accept: 'application/json'
  };
};

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const token = response.data?.data?.token;
    const user = response.data?.data?.account;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    }
    throw new Error("Token tidak ditemukan");
  },

  getAddresses: async () => {
    const response = await axios.get(`${API_URL}/address`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  createAddress: async (payload) => {
    const response = await axios.post(`${API_URL}/address`, payload, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateAddress: async (id, payload) => {
    const response = await axios.put(`${API_URL}/address/${id}`, payload, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteAddress: async (id) => {
    const response = await axios.delete(`${API_URL}/address/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};