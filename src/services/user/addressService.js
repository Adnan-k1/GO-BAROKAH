import api from '../../utils/api';

export const addressService = {
  getAddresses: async () => {
    const response = await api.get('/users/address');
    return response.data;
  },

  createAddress: async (payload) => {
    const response = await api.post('/users/address', payload);
    return response.data;
  },

  updateAddress: async (id, payload) => {
    const response = await api.patch(`/users/address/${id}`, payload);
    return response.data;
  },

  deleteAddress: async (id) => {
    const response = await api.delete(`/users/address/${id}`);
    return response.data;
  }
};