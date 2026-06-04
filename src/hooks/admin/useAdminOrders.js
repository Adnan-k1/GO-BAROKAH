import { useState, useEffect } from "react";
import { adminOrderService } from "../../services/admin/adminOrderService";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mapStatusToUI = (apiStatus, isPickup) => {
    const statusMap = {
      "PENDING": "Menunggu",
      "PROCESSING": "Disiapkan",
      "SHIPPED": isPickup ? "Dapat Diambil" : "Dikirim", 
      "COMPLETED": "Selesai",
      "CANCELLED": "Dibatalkan"
    };
    return statusMap[apiStatus] || apiStatus;
  };

  const mapStatusToAPI = (uiStatus) => {
    const statusMap = {
      "Menunggu": "PENDING",
      "Disiapkan": "PROCESSING",
      "Dapat Diambil": "SHIPPED",
      "Dikirim": "SHIPPED",
      "Selesai": "COMPLETED",
      "Dibatalkan": "CANCELLED"
    };
    return statusMap[uiStatus] || uiStatus;
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await adminOrderService.getAllOrders();
      const dataAsli = response.data?.data || response.data || [];
      
      const formattedOrders = dataAsli.map((o) => {
        const isPickup = o.shippingAddress?.toLowerCase().includes("ambil di toko") || false;

        return {
          id: o.id,
          customer_name: o.recipientName,
          user_id: o.userId, 
          created_at: new Date(o.createdAt).toLocaleString('id-ID'), 
          address: o.shippingAddress,
          total_price: o.grandTotal,
          status: mapStatusToUI(o.status, isPickup), 
          is_pickup: isPickup,
          payment_method: o.paymentMethod || "Transfer Bank / VA",
          items: o.items?.map(item => ({
            name: item.productName,
            qty: item.quantity,
            price: item.finalUnitPrice
          })) || []
        };
      });

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Gagal mengambil data pesanan admin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatusUI) => {
    try {
      const statusForAPI = mapStatusToAPI(newStatusUI);
      
      await adminOrderService.updateOrderStatus(orderId, statusForAPI);
      
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatusUI } : order
        )
      );
    } catch (error) {
      console.error("Gagal mengupdate status:", error);
      alert("Gagal update status pesanan. Coba lagi.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    fetchOrders,
    handleUpdateStatus
  };
};