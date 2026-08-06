import React from "react";
import {
  ChevronLeft, ChevronRight, Loader2,
  Clock, Package, CheckCircle2, Truck, XCircle, Store,
} from "lucide-react";
import OrderActionButtons from "./OrderActionButtons";
import { formatFullCurrency } from "../../../utils/formatCurrency";
import { formatDateID } from "../../../utils/formatters";

const PER_PAGE = 10;

const STATUS_CONFIG = {
  Menunggu: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
    icon: <Clock size={10} />,
  },
  Disiapkan: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    icon: <Package size={10} />,
  },
  "Dapat Diambil": {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100",
    icon: <Store size={10} />,
  },
  Dikirim: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    icon: <Truck size={10} />,
  },
  Selesai: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
    icon: <CheckCircle2 size={10} />,
  },
  Dibatalkan: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
    icon: <XCircle size={10} />,
  },
};

const COLUMN_HEADERS = [
  "Pelanggan",
  "Tanggal",
  "Total Bayar",
  "Pembayaran",
  "Status",
  "Aksi",
];

const LoadingState = () => (
  <tr>
    <td colSpan={6} className="py-24 text-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
        Memuat Data...
      </p>
    </td>
  </tr>
);

const EmptyState = () => (
  <tr>
    <td colSpan={6} className="py-24 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
      DATA TIDAK DITEMUKAN
    </td>
  </tr>
);

const OrderRow = ({ order, onOpenDetail, onConfirm }) => {
  const isPaid = order.paymentStatus === "PAID" || order.payment_status === "PAID";

  return (
    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors h-[68px]">
      <td className="px-4 py-5">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase truncate tracking-tight text-slate-700">
            {order.customer_name}
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase">
            {order.order_number || `#${order.id}`}
          </span>
        </div>
      </td>
      <td className="px-4 py-5 text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap">
        {formatDateID(order.created_at)}
      </td>
      <td className="px-4 py-5 text-xs font-black text-slate-900 whitespace-nowrap">
        {formatFullCurrency(order.total_price || order.total_amount || 0)}
      </td>
      <td className="px-4 py-5">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider ${
            isPaid
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : order.is_pickup
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : "bg-red-50 text-red-500 border-red-100"
          }`}
        >
          {isPaid ? "Lunas" : order.is_pickup ? "Bayar di Toko" : "Belum Dibayar"}
        </div>
      </td>
      <td className="px-4 py-5">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider whitespace-nowrap ${STATUS_CONFIG[order.status]?.bg} ${STATUS_CONFIG[order.status]?.text} ${STATUS_CONFIG[order.status]?.border}`}
        >
          {STATUS_CONFIG[order.status]?.icon} {order.status}
        </div>
      </td>
      <td className="px-4 py-5 text-right">
        <OrderActionButtons order={order} onOpenDetail={onOpenDetail} onConfirm={onConfirm} />
      </td>
    </tr>
  );
};

const PaginationFooter = ({ page, totalPages, onPageChange }) => (
  <footer className="px-4 md:px-8 py-4 border-t border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
      Page {page} of {totalPages}
    </p>
    <div className="flex gap-1.5">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-20"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-20"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  </footer>
);

const OrdersTable = ({
  orders,
  isLoading,
  tableScrollRef,
  onOpenDetail,
  onConfirm,
  page,
  totalPages,
  onPageChange,
}) => (
  <>
    <div className="flex-1 overflow-auto custom-scrollbar" ref={tableScrollRef}>
      <table className="w-full border-collapse min-w-[700px]">
        <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-100">
          <tr>
            {COLUMN_HEADERS.map((h) => (
              <th
                key={h}
                className={`px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest ${h === "Aksi" ? "text-right" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {isLoading ? (
            <LoadingState />
          ) : orders.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {orders.map((o) => (
                <OrderRow
                  key={o.id}
                  order={o}
                  onOpenDetail={onOpenDetail}
                  onConfirm={onConfirm}
                />
              ))}
              {orders.length < PER_PAGE && (
                <tr style={{ height: `${(PER_PAGE - orders.length) * 68}px` }}>
                  <td colSpan={7} />
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
    <PaginationFooter page={page} totalPages={totalPages} onPageChange={onPageChange} />
  </>
);

export default OrdersTable;
