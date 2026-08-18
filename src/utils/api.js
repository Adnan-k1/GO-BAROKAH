import axios from 'axios';
import { translateError } from './errorTranslator';
import { AUTH_SESSION_EXPIRED_EVENT, clearAuthSession, getToken } from './authStorage';

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
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authorization = error.config?.headers?.Authorization
      || error.config?.headers?.authorization
      || error.config?.headers?.get?.('Authorization');

    if (error.response?.status === 401 && authorization) {
      clearAuthSession();
      window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
    }

    if (error.response?.data?.message) {
      error.response.data.message = translateError(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;
