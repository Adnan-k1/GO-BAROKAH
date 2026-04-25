import axios from 'axios';

// 1. Definisikan Base URL melalui Environment Variable (Opsional tapi disarankan)
// Jika tidak ada env, gunakan string kosong atau URL server kamu
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173/api',
});

// 2. Gunakan Interceptor untuk menempelkan token secara otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ambil token dinamis dari storage
    
    if (token) {
      // Pasang format Bearer di sini, jadi tidak perlu tulis manual di setiap fungsi
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;