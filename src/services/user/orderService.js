import api from '../../utils/api';

const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/api/orders', orderData); 
    return response.data;
  },
  getOrders: async () => {
    const response = await api.get('/api/orders');
    return response.data;
  }
};

export default orderService;