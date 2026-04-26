import { useState, useEffect, useMemo } from "react";

export const useAdminTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mockTransactions = [
    {
      id: 10245,
      customer_name: "Robert Fox",
      created_at: "26/04/2026 14:30",
      total_price: 750000,
      status: "Menunggu",
      is_pickup: true,
      payment_method: "Transfer Bank - BCA",
    },
    {
      id: 10248,
      customer_name: "Cameron Williamson",
      created_at: "25/04/2026 10:20",
      total_price: 2500000,
      status: "Selesai",
      is_pickup: false,
      payment_method: "Transfer Bank - Mandiri",
    },
    {
      id: 10249,
      customer_name: "Eleanor Pena",
      created_at: "25/04/2026 11:00",
      total_price: 150000,
      status: "Dibatalkan",
      is_pickup: false,
      payment_method: "Transfer Bank - BRI",
    },
  ];

  const fetchTransactions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  };

  const stats = useMemo(() => {
    const totalRevenue = transactions
      .filter(o => o.status === "Selesai")
      .reduce((acc, curr) => acc + curr.total_price, 0);
    
    return {
      totalAmount: totalRevenue,
      totalCount: transactions.length,
      pending: transactions.filter(o => o.status === "Menunggu").length,
    };
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    isLoading,
    stats,
    fetchTransactions,
  };
};