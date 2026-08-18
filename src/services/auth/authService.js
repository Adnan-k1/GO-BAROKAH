import api from '../../utils/api'; 

const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },
  
  loginWithGoogle: async (idToken) => {
    const response = await api.post('/api/auth/google', { id_token: idToken });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
  verifyOTP: async (email, otp) => {
    const response = await api.post('/api/otp/email/verify', { email, otp });
    return response.data;
  },

  resendOTP: async (email) => {
    const response = await api.post('/api/otp/email/request', { email });
    return response.data;
  },

  requestPhoneOTP: async () => {
    const response = await api.post('/api/otp/phone/request');
    return response.data;
  },

  verifyPhoneOTP: async (otp) => {
    const response = await api.post('/api/otp/phone/verify', { otp });
    return response.data;
  },

};

export default authService;
