import api from '../../utils/api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/api/carts');
    return response.data;
  },

  addItem: async (productId, quantity = 1) => {
    const response = await api.post('/api/carts/items', {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  updateItem: async (productId, quantity) => {
    const response = await api.patch(`/api/carts/items/${productId}`, { quantity });
    return response.data;
  },

  deleteItem: async (productId) => {
    const response = await api.delete(`/api/carts/items/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/api/carts');
    return response.data;
  },
};