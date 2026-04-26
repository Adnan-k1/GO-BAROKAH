import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderHistoryData } from '../../data/orderHistoryData';

export const useHistoryLogic = () => {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Semua');

  const statuses = ['Semua', 'Menunggu', 'Disiapkan', 'Selesai', 'Dibatalkan', 'Dikirim'];

  useEffect(() => {
    setAllOrders(orderHistoryData);
  }, []);

  const statusMap = {
    'Menunggu': 'pending',
    'Disiapkan': 'processing',
    'Selesai': 'completed',
    'Dibatalkan': 'cancelled',
    'Dikirim': 'shipping' 
  };

  const orders = useMemo(() => {
    if (activeTab === 'Semua') return allOrders;
    return allOrders.filter(order => order.status.toLowerCase() === statusMap[activeTab]);
  }, [activeTab, allOrders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
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