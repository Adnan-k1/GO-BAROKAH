import axios from 'axios';
import { translateError } from './errorTranslator';

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const cleanToken = token.replace(/['"]+/g, '');
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      error.response.data.message = translateError(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;