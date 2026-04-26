import {
  LayoutDashboard, Package, ClipboardList, History,
  ShoppingCart, Users, DollarSign,
} from "lucide-react";

export const NAV_ITEMS = Object.freeze([
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "inventory", label: "Inventaris", icon: Package,         path: "/admin/inventory"  },
  { id: "orders",    label: "Pesanan",    icon: ClipboardList,   path: "/admin/orders"     },
  { id: "transactions", label: "Riwayat Transaksi", icon: History, path: "/admin/transactions" },
]);

export const STAT_CONFIG = Object.freeze([
  { key: "totalOrders", label: "Total Pesanan", icon: ShoppingCart, variant: "blue" },
  { key: "customers", label: "Pelanggan", icon: Users, variant: "violet" },
  { key: "revenue", label: "Pendapatan", icon: DollarSign, variant: "emerald" },
  { key: "totalProducts", label: "Total Produk", icon: Package, variant: "amber" },
]);

export const ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPING: "shipping",
  SUCCESS: "success",
  CANCELLED: "cancelled",
});

export const ORDER_STATUS_LABEL = Object.freeze({
  [ORDER_STATUS.PENDING]: "Menunggu",
  [ORDER_STATUS.PROCESSING]: "Disiapkan",
  [ORDER_STATUS.SHIPPING]: "Dikirim",
  [ORDER_STATUS.SUCCESS]: "Berhasil",
  [ORDER_STATUS.CANCELLED]: "Dibatalkan",
});

export const ORDER_STATUS_STYLE = Object.freeze({
  [ORDER_STATUS.PENDING]: "bg-amber-50 text-amber-700 border-amber-100",
  [ORDER_STATUS.PROCESSING]: "bg-blue-50 text-blue-700 border-blue-100",
  [ORDER_STATUS.SHIPPING]: "bg-purple-50 text-purple-700 border-purple-100",
  [ORDER_STATUS.SUCCESS]: "bg-emerald-50 text-emerald-700 border-emerald-100",
  [ORDER_STATUS.CANCELLED]: "bg-red-50 text-red-700 border-red-100",
});

export const ORDER_TABS = ["Semua", ...Object.values(ORDER_STATUS)];
export const LOW_STOCK_THRESHOLD = 15;