import {
  LayoutDashboard, Package, ClipboardList, History,
  ShoppingCart, Users, DollarSign,
} from "lucide-react";

// ─── NAVIGATION ─────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "Inventory", icon: Package,         path: "/admin/inventory"  },
  { id: "Orders",    icon: ClipboardList,   path: "/admin/orders"     },
  { id: "Reports",   icon: History,         path: "/admin/reports"    },
];

// ─── STAT CARD CONFIG ────────────────────────────────────────────
export const STAT_CONFIG = [
  {
    key: "totalOrders",
    label: "Total Pesanan",
    icon: ShoppingCart,
    colorText: "text-blue-600",
    colorBg: "bg-blue-50",
    colorRing: "ring-blue-100",
  },
  {
    key: "customers",
    label: "Pelanggan",
    icon: Users,
    colorText: "text-violet-600",
    colorBg: "bg-violet-50",
    colorRing: "ring-violet-100",
  },
  {
    key: "revenue",
    label: "Pendapatan",
    icon: DollarSign,
    colorText: "text-emerald-700",
    colorBg: "bg-emerald-50",
    colorRing: "ring-emerald-100",
  },
  {
    key: "totalProducts",
    label: "Total Produk",
    icon: Package,
    colorText: "text-amber-600",
    colorBg: "bg-amber-50",
    colorRing: "ring-amber-100",
  },
];

// ─── ORDER STATUS ────────────────────────────────────────────────
export const ORDER_STATUS = {
  SUCCESS: "Success",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_STYLE = {
  [ORDER_STATUS.SUCCESS]:   "bg-emerald-50 text-emerald-700 border-emerald-100",
  [ORDER_STATUS.PENDING]:   "bg-amber-50   text-amber-700   border-amber-100",
  [ORDER_STATUS.CANCELLED]: "bg-red-50     text-red-700     border-red-100",
};

// ─── STOCK THRESHOLD ─────────────────────────────────────────────
export const LOW_STOCK_THRESHOLD = 15; // unit