import React, { useMemo } from "react";
import { formatRupiah } from "../../../utils/formatters";
import { ORDER_STATUS_STYLE } from "../../../constants/adminConstants";

const OrderRow = React.memo(({ order }) => {
  const { id, customer, date, total, status } = order;
  const badgeStyle = useMemo(() => 
    ORDER_STATUS_STYLE[status] ?? "bg-slate-50 text-slate-500 border-slate-100", 
  [status]);

  const initials = useMemo(() => 
    customer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 1),
  [customer]);

  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/80 transition-all rounded-xl group cursor-default border-b border-slate-50 last:border-0">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate leading-tight">{customer}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">{id} • {date}</p>
      </div>

      <div className="text-right flex flex-col items-end gap-1.5">
        <p className="text-sm font-black text-slate-900 tabular-nums">
          {formatRupiah(total)}
        </p>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${badgeStyle}`}>
          {status}
        </span>
      </div>
    </div>
  );
});

export default OrderRow;