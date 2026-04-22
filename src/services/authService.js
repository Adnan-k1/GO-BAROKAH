import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Konfigurasi header standar untuk ngrok
const ngrokConfig = {
  headers: { 'ngrok-skip-browser-warning': 'true' }
};

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials, ngrokConfig);
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData, ngrokConfig);
    return response.data;
  },

  // --- FUNGSI BARU UNTUK RADEN ---
  verifyOTP: async (email, otp) => {
    // Sesuaikan payload { email, otp } dengan yang diminta backend Raden
    const response = await axios.post(`${API_URL}/api/otp/verify`, { email, otp }, ngrokConfig);
    return response.data;
  },

  resendOTP: async (email) => {
    const response = await axios.post(`${API_URL}/api/otp/request`, { email }, ngrokConfig);
    return response.data;
  },
  // ------------------------------

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};