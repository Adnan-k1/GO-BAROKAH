import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOrderLogic = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Semua');

  const statuses = ['Semua', 'Menunggu', 'Disiapkan', 'Dikirim', 'Selesai'];


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleStartShopping = () => navigate('/store');
  const handleViewDetail = (id) => navigate(`/profile/orders/${id}`);

  return {
    orders,
    activeTab,
    setActiveTab,
    statuses,
    formatCurrency,
    handleStartShopping,
    handleViewDetail
  };
};