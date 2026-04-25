import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatRupiah, formatNumber } from "../../utils/formatters"; // ✅ fix: tambah formatNumber

const StatCard = ({ config, statData }) => {
  const { label, icon: Icon, colorText, colorBg, colorRing, key } = config;
  const { value, growth } = statData;
  const isPositive = growth >= 0;

  const displayValue =
    key === "revenue" ? formatRupiah(value) : formatNumber(value);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ring-1 ${colorBg} ${colorText} ${colorRing}`}>
        <Icon size={20} />
      </div>

      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>

      <p className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
        {displayValue}
      </p>

      <div className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full
        ${isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
        {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {isPositive ? "+" : ""}{growth}% vs bulan lalu
      </div>
    </div>
  );
};

export default StatCard;
