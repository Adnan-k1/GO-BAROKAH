import api from '../../utils/api'; 

export const userService = {
  updateProfile: async (userData) => { 
    const response = await api.patch('/users', userData);
    return response.data;
  },
  getProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }
};