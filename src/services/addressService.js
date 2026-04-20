import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'ngrok-skip-browser-warning': '69420',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (token) {
    const cleanToken = token.replace(/['"]+/g, '').trim();
    headers['Authorization'] = `Bearer ${cleanToken}`;
  }
  return headers;
};

export const addressService = {
  getAddresses: async () => {
    const response = await axios.get(`${API_URL}/api/users/address`, { headers: getAuthHeader() });
    return response.data;
  },
  createAddress: async (payload) => {
    const response = await axios.post(`${API_URL}/api/users/address`, payload, { headers: getAuthHeader() });
    return response.data;
  },
  updateAddress: async (id, payload) => {
  const response = await axios.patch(`${API_URL}/api/users/address/${id}`, payload, { headers: getAuthHeader() });
  return response.data;
},
  deleteAddress: async (id) => {
    const response = await axios.delete(`${API_URL}/api/users/address/${id}`, { headers: getAuthHeader() });
    return response.data;
  }
};