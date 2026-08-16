import { useState } from 'react';
import toast from 'react-hot-toast';
import orderService from '../../services/user/orderService'; 
import { useCart } from '../../context/CartContext'; 

export const usePaymentLogic = () => {
  const [loading, setLoading] = useState(false);
  const { loadCart, clearSelectedCartItems } = useCart();

  const processOrder = async (orderData, isPickup, selectedCartItemIds, navigate) => {
    try {
      setLoading(true);
      
      let response;

      if (isPickup) {
        const payloadPickup = {
          cart_item_ids: selectedCartItemIds,
          notes: orderData.notes 
        };
        response = await orderService.createPickupOrder(payloadPickup);
      } else {
        const payloadDelivery = {
          notes: orderData.notes,
          address_id: Number(orderData.address_id),
          cart_item_ids: selectedCartItemIds,
        };
        response = await orderService.createDeliveryOrder(payloadDelivery);
      }

      const orderId = response?.data?.id || response?.data?.data?.id || response?.id;
      const createdOrder = response?.data?.data || response?.data || response;

      if (orderId) {
        if (isPickup) {
          clearSelectedCartItems();
          navigate('/order-success', {
            replace: true,
            state: { order: createdOrder }
          });
          loadCart().catch((error) => {
            console.error("Gagal menyinkronkan keranjang setelah pickup:", error);
          });
          return;
        }

        await loadCart();
        clearSelectedCartItems();

        const paymentRes = await orderService.payOrder(orderId);
        
        const paymentUrl = paymentRes?.data?.payment_url || paymentRes?.payment_url;

        if (paymentUrl) {
          localStorage.setItem('pendingPayment', 'true');
          window.location.href = paymentUrl;
          return;
        }
      }

      await loadCart();
      clearSelectedCartItems();

      navigate('/order-success', {
        replace: true,
        state: { order: createdOrder }
      });

    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(error.response?.data?.message || "Gagal memproses pesanan.");
    } finally {
      setLoading(false);
    }
  };

  return { processOrder, loading };
};
