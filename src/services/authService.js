import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};