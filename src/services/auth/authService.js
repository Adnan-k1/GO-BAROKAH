import api from '../../utils/api'; 

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  verifyOTP: async (email, otp) => {
    const response = await api.post('/otp/verify', { email, otp });
    return response.data;
  },

  resendOTP: async (email) => {
    const response = await api.post('/otp/request', { email });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_session'); 
  }
};