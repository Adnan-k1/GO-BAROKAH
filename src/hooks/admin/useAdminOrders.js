import { useState, useEffect } from "react";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mockOrders = [
    {
      id: 10245,
      customer_name: "Robert Fox",
      user_id: "USR-001",
      created_at: "26/04/2026 14:30",
      address: "JL. VETERAN NO. 12, SURAKARTA",
      total_price: 750000,
      status: "Menunggu",
      is_pickup: true,
      payment_method: "Transfer Bank - BCA",
      items: [{ name: "Beras Rojolele 5kg", qty: 2, price: 150000 }, { name: "Minyak Goreng 2L", qty: 3, price: 45000 }],
    },
    {
      id: 10246,
      customer_name: "Jane Cooper",
      user_id: "USR-042",
      created_at: "26/04/2026 15:10",
      address: "KAVLING POLRI BLOK D3, TANGERANG SELATAN",
      total_price: 1250000,
      status: "Disiapkan",
      is_pickup: false,
      payment_method: "Transfer Bank - Mandiri",
      items: [{ name: "Gula Pasir 10kg", qty: 1, price: 160000 }],
    },
    {
      id: 10247,
      customer_name: "Wade Warren",
      user_id: "USR-112",
      created_at: "26/04/2026 09:45",
      address: "APARTEMEN MEDITERANIA, JAKARTA BARAT",
      total_price: 450000,
      status: "Dapat Diambil",
      is_pickup: true,
      payment_method: "Tunai (Bayar di Toko)",
      items: [{ name: "Telur Ayam 1 Tray", qty: 2, price: 55000 }],
    },
    {
      id: 10248,
      customer_name: "Cameron Williamson",
      user_id: "USR-089",
      created_at: "25/04/2026 10:20",
      address: "PERUMAHAN ELIT HIJAU NO. 88, BOGOR",
      total_price: 2500000,
      status: "Selesai",
      is_pickup: false,
      payment_method: "Transfer Bank - Mandiri",
      items: [{ name: "Sembako Paket Hemat", qty: 10, price: 250000 }],
    },
    {
      id: 10249,
      customer_name: "Eleanor Pena",
      user_id: "USR-034",
      created_at: "25/04/2026 11:00",
      address: "DSN. MULYOREJO RT 02, KEDIRI",
      total_price: 150000,
      status: "Dibatalkan",
      is_pickup: false,
      payment_method: "Transfer Bank - BRI",
      items: [{ name: "Indomie Goreng 1 Dus", qty: 1, price: 115000 }],
    },
    {
      id: 10250,
      customer_name: "Guy Hawkins",
      user_id: "USR-201",
      created_at: "25/04/2026 13:15",
      address: "GRIYA ASRI BLOK C5, BEKASI",
      total_price: 890000,
      status: "Selesai",
      is_pickup: true,
      payment_method: "Transfer Bank - BRI",
      items: [{ name: "Minyak Goreng 5L", qty: 4, price: 85000 }],
    },
    {
      id: 10251,
      customer_name: "Brooklyn Simmons",
      user_id: "USR-056",
      created_at: "25/04/2026 16:40",
      address: "CLUSTER GARDENIA NO. 102, CIBUBUR",
      total_price: 340000,
      status: "Menunggu",
      is_pickup: true,
      payment_method: "Tunai",
      items: [{ name: "Sabun Cuci Piring 1L", qty: 5, price: 18000 }],
    },
    {
      id: 10252,
      customer_name: "Jerome Bell",
      user_id: "USR-099",
      created_at: "24/04/2026 08:20",
      address: "KOMPLEK MARINIR BLOK B2, MERUYA",
      total_price: 520000,
      status: "Dikirim",
      is_pickup: false,
      payment_method: "Transfer Bank - BNI",
      items: [{ name: "Terigu 1kg", qty: 10, price: 15000 }],
    },
    {
      id: 10253,
      customer_name: "Arlene McCoy",
      user_id: "USR-012",
      created_at: "24/04/2026 09:10",
      address: "JL. RAYA KUTA NO. 45X, BADUNG, BALI",
      total_price: 210000,
      status: "Disiapkan",
      is_pickup: true,
      payment_method: "Transfer Bank - BCA",
      items: [{ name: "Kopi Sachet Pack", qty: 3, price: 45000 }],
    },
    {
      id: 10254,
      customer_name: "Dianne Russell",
      user_id: "USR-155",
      created_at: "24/04/2026 10:30",
      address: "PERUMAHAN HARAPAN BARU, SEMARANG",
      total_price: 1100000,
      status: "Selesai",
      is_pickup: false,
      payment_method: "Transfer Bank - BCA",
      items: [{ name: "Susu UHT 1L", qty: 12, price: 21000 }],
    },
    {
      id: 10255,
      customer_name: "Leslie Alexander",
      user_id: "USR-077",
      created_at: "24/04/2026 11:45",
      address: "JL. PEMUDA NO. 101, SURABAYA",
      total_price: 430000,
      status: "Menunggu",
      is_pickup: true,
      payment_method: "Tunai",
      items: [{ name: "Telor Ayam 1kg", qty: 5, price: 28000 }],
    },
    {
      id: 10256,
      customer_name: "Courtney Henry",
      user_id: "USR-188",
      created_at: "23/04/2026 13:20",
      address: "CITRA RAYA BLOK G12, TANGERANG",
      total_price: 1800000,
      status: "Dikirim",
      is_pickup: false,
      payment_method: "Transfer Bank - Mandiri",
      items: [{ name: "Beras Premium 25kg", qty: 2, price: 450000 }],
    },
    {
      id: 10257,
      customer_name: "Theresa Webb",
      user_id: "USR-023",
      created_at: "23/04/2026 14:15",
      address: "JL. MERDEKA NO. 5, BANDUNG",
      total_price: 95000,
      status: "Dibatalkan",
      is_pickup: true,
      payment_method: "Tunai",
      items: [{ name: "Garam Dapur 500g", qty: 10, price: 5000 }],
    },
    {
      id: 10258,
      customer_name: "Albert Flores",
      user_id: "USR-133",
      created_at: "23/04/2026 15:50",
      address: "BUKIT PERMATA NO. 44, BALIKPAPAN",
      total_price: 670000,
      status: "Selesai",
      is_pickup: true,
      payment_method: "Tunai",
      items: [{ name: "Kecap Manis 520ml", qty: 6, price: 25000 }],
    },
    {
      id: 10259,
      customer_name: "Kathryn Murphy",
      user_id: "USR-045",
      created_at: "22/04/2026 08:00",
      address: "LEGENDA WISATA BLOK M1, BOGOR",
      total_price: 320000,
      status: "Dapat Diambil",
      is_pickup: true,
      payment_method: "Transfer Bank - Mandiri",
      items: [{ name: "Sabun Batang Pack", qty: 4, price: 35000 }],
    },
];

  const fetchOrders = () => {
    setIsLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleCancelOrder = (orderId) => {
    handleUpdateStatus(orderId, "Dibatalkan");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    fetchOrders,
    handleUpdateStatus,
    handleCancelOrder,
  };
};