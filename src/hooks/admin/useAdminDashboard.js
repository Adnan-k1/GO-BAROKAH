import { useState, useEffect } from "react";

const MOCK_RESPONSE = {
  stats: {
    totalOrders:   { value: 1284,       growth: 12.4  },
    customers:     { value: 3920,       growth: 8.1   },
    revenue:       { value: 48700000,   growth: 21.3  },
    totalProducts: { value: 214,        growth: -3.2  },
  },
  orders: [
    { id: "#ORD-8821", customer: "Rizky Pratama",  date: "22 Jul", total: 320000, status: "Success"   },
    { id: "#ORD-8820", customer: "Siti Nurbaya",   date: "22 Jul", total: 185000, status: "Pending"   },
    { id: "#ORD-8819", customer: "Budi Santoso",   date: "21 Jul", total: 540000, status: "Success"   },
    { id: "#ORD-8818", customer: "Dewi Larasati",  date: "21 Jul", total: 97000,  status: "Pending"   },
    { id: "#ORD-8817", customer: "Hendra Wijaya",  date: "20 Jul", total: 210000, status: "Cancelled" },
  ],
  lowStock: [
    { id: 1, name: "Beras Premium 5kg", stock: 4,  maxStock: 50, unit: "karung"  },
    { id: 2, name: "Minyak Goreng 2L",  stock: 7,  maxStock: 40, unit: "botol"   },
    { id: 3, name: "Gula Pasir 1kg",    stock: 11, maxStock: 60, unit: "bungkus" },
    { id: 4, name: "Gula Pasir 1kg",    stock: 11, maxStock: 60, unit: "bungkus" },
    
    { id: 5, name: "Gula Pasir 1kg",    stock: 11, maxStock: 60, unit: "bungkus" },
  ],
};

export const useAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(MOCK_RESPONSE);
      } catch (err) {
        setError("Gagal memuat data dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  const refresh = () => console.log("Refresh dipanggil (Mock Mode)");

  return { data, isLoading, error, refresh };
};