import React from "react";
import { stockPercent, stockBarColor } from "../../utils/formatters"; // ✅ fix: tambah kedua fungsi ini

const StockAlertItem = ({ item }) => {
  const { name, stock, maxStock, unit } = item;
  const pct   = stockPercent(stock, maxStock);
  const color = stockBarColor(pct);

  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-100 hover:bg-red-50/20 transition-all">
      <div className="flex items-start justify-between mb-2.5">
        <p className="text-sm font-semibold text-slate-800 leading-tight">{name}</p>
        <span className="text-[11px] font-bold text-red-500 flex-shrink-0 ml-2">
          {stock} {unit}
        </span>
      </div>

      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={stock}
          aria-valuemax={maxStock}
        />
      </div>

      <p className="text-[10px] text-slate-400 font-medium mt-1.5">{pct}% stok tersisa</p>
    </div>
  );
};

export default StockAlertItem;
