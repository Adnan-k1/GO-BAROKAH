import React from "react";
import { formatRupiah } from "../../utils/formatters";
import { ORDER_STATUS_STYLE } from "../../constants/adminConstants";

/**
 * OrderRow
 * Satu baris dalam tabel Recent Orders.
 *
 * @param {object} order - { id, customer, date, total, status }
 */
const OrderRow = ({ order }) => {
  const { id, customer, date, total, status } = order;
  const badgeStyle = ORDER_STATUS_STYLE[status] ?? "bg-slate-50 text-slate-500 border-slate-100";

  return (
    <div className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/80 transition-colors rounded-xl group">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
        {customer[0].toUpperCase()}
      </div>

      {/* Customer info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate leading-tight">{customer}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{id} · {date}</p>
      </div>

      {/* Total */}
      <p className="text-sm font-bold text-slate-900 tabular-nums mr-2">
        {formatRupiah(total)}
      </p>

      {/* Status badge */}
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide flex-shrink-0 ${badgeStyle}`}>
        {status}
      </span>
    </div>
  );
};

export default OrderRow;
