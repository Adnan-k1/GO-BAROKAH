import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatRupiah, formatNumber } from "../../../utils/formatters";

const StatCard = ({ config, statData }) => {
  const { label, icon: Icon, variant, key } = config;
  const value = statData?.value ?? 0;
  const growth = statData?.growth ?? 0;
  const isPositive = growth >= 0;

  const variantStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
  };

  const style = variantStyles[variant] || variantStyles.blue;
  const displayValue = key === "revenue" ? formatRupiah(value) : formatNumber(value);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-slate-300 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {label}
          </p>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight truncate">
            {displayValue}
          </h3>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${style}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className={`flex items-center gap-0.5 font-bold text-[11px] 
          ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(growth)}%</span>
        </div>
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
          vs bln lalu
        </span>
      </div>
    </div>
  );
};

export default StatCard;