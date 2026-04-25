import { useState, useEffect } from "react";

// ─── MOCK DATA (ganti dengan API call sungguhan) ─────────────────
const MOCK_RESPONSE = {
  stats: {
    totalOrders:   { value: 1284,      growth: 12.4  },
    customers:     { value: 3920,      growth: 8.1   },
    revenue:       { value: 48_700_000, growth: 21.3  },
    totalProducts: { value: 214,       growth: -3.2  },
  },
  orders: [
    { id: "#ORD-8821", customer: "Rizky Pratama",  date: "22 Jul", total: 320_000, status: "Success"   },
    { id: "#ORD-8820", customer: "Siti Nurbaya",   date: "22 Jul", total: 185_000, status: "Pending"   },
    { id: "#ORD-8819", customer: "Budi Santoso",   date: "21 Jul", total: 540_000, status: "Success"   },
    { id: "#ORD-8818", customer: "Dewi Larasati",  date: "21 Jul", total: 97_000,  status: "Pending"   },
    { id: "#ORD-8817", customer: "Hendra Wijaya",  date: "20 Jul", total: 210_000, status: "Cancelled" },
  ],
  lowStock: [
    { id: 1, name: "Beras Premium 5kg", stock: 4,  maxStock: 50, unit: "karung"  },
    { id: 2, name: "Minyak Goreng 2L",  stock: 7,  maxStock: 40, unit: "botol"   },
    { id: 3, name: "Gula Pasir 1kg",    stock: 11, maxStock: 60, unit: "bungkus" },
  ],
};

/**
 * useAdminDashboard
 * Mengelola fetching & state data dashboard admin.
 * Swap MOCK_RESPONSE dengan axios/fetch ke API nyata.
 */
export const useAdminDashboard = () => {
  const [data, setData]       = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);

        // ── Ganti baris ini dengan API call sesungguhnya ──────────
        // const res = await api.get("/admin/dashboard");
        // setData(res.data);
        // ─────────────────────────────────────────────────────────

        await new Promise((r) => setTimeout(r, 600)); // simulasi latency
        setData(MOCK_RESPONSE);
      } catch (err) {
        setError(err?.message ?? "Gagal memuat data dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, isLoading, error };
};