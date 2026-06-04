import { useState } from 'react';
import api from '../../utils/api'; 
import { useCart } from '../../context/CartContext'; 

export const usePaymentLogic = () => {
  const [loading, setLoading] = useState(false);
  const { loadCart } = useCart(); 

  const processOrder = async (orderData, navigate) => {
    try {
      setLoading(true);
      
      const payload = {
        notes: orderData.notes || "Tolong kirim secepatnya"
      };

      if (orderData.addressId !== 0) {
        payload.address_id = Number(orderData.addressId);
      }

      const response = await api.post('/api/orders', payload);
      await loadCart();

      navigate('/order-success', {
        replace: true,
        state: { order: response.data?.data || response.data }
      });

    } catch (error) {
      console.error("Checkout Error:", error);
      alert(error.response?.data?.message || "Gagal memproses pesanan.");
    } finally {
      setLoading(false);
    }
  };

  return { processOrder, loading };
};