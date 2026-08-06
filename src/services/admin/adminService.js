import api from '../../utils/api'; 

export const adminService = {
  updateProfile: async (formData) => {
    const response = await api.patch('/api/users', formData);
    return response.data;
  }
  
};