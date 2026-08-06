import React from "react";
import {
  Eye, Briefcase, Store, Truck, CheckCircle2,
} from "lucide-react";

const btnClass = "p-2.5 rounded-xl transition-all shadow-sm border active:scale-95 flex items-center justify-center";
const disabledBtnClass = "p-2.5 rounded-xl transition-all shadow-sm border opacity-50 cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200 flex items-center justify-center";

const OrderActionButtons = ({ order, onOpenDetail, onConfirm }) => {
  const isPaid = order.paymentStatus === "PAID" || order.payment_status === "PAID";

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => onOpenDetail(order)}
        title="Detail Pesanan"
        className={`${btnClass} bg-white text-slate-400 border-slate-100 hover:text-slate-900 hover:border-slate-300`}
      >
        <Eye size={14} />
      </button>

      {order.status === "Menunggu" && (
        <>
          {isPaid || order.is_pickup ? (
            <button
              onClick={() => onConfirm(order, "Disiapkan")}
              title={order.is_pickup ? "Proses Pesanan (Bayar di Toko)" : "Proses Pesanan"}
              className={`${btnClass} bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-[#1a4d2e] hover:text-white`}
            >
              <Briefcase size={14} strokeWidth={2.5} />
            </button>
          ) : (
            <button
              disabled
              title="Tidak bisa diproses: Pelanggan belum membayar"
              className={disabledBtnClass}
            >
              <Briefcase size={14} strokeWidth={2.5} />
            </button>
          )}
        </>
      )}

      {order.status === "Disiapkan" && (
        <>
          {order.is_pickup ? (
            <button
              onClick={() => onConfirm(order, "Dapat Diambil")}
              className={`${btnClass} bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white`}
            >
              <Store size={14} />
            </button>
          ) : (
            <button
              onClick={() => onConfirm(order, "Dikirim")}
              className={`${btnClass} bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white`}
            >
              <Truck size={14} />
            </button>
          )}
        </>
      )}

      {(order.status === "Dikirim" || order.status === "Dapat Diambil") && (
        <button
          onClick={() => onConfirm(order, "Selesai")}
          className={`${btnClass} bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white`}
        >
          <CheckCircle2 size={14} />
        </button>
      )}
    </div>
  );
};

export default OrderActionButtons;
