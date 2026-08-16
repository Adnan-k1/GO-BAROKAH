import React, { useState, useRef, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, ChevronDown } from "lucide-react";
import { formatIDR } from "../../utils/formatCurrency";

const getStatusStyle = (status) => {
  if (status === "POSITIVE") return "bg-emerald-50 text-emerald-600 border-emerald-100";
  if (status === "NEGATIVE") return "bg-red-50 text-red-600 border-red-100";
  return "bg-amber-50 text-amber-600 border-amber-100";
};

const CashFlowCard = ({ cashFlow }) => {
  const [isNumberExpanded, setIsNumberExpanded] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);
  const status = cashFlow?.status || "BREAK_EVEN";
  const displayValue = formatIDR(cashFlow?.net_cash_flow || 0);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [displayValue]);

  return (
    <div
      onClick={() => isOverflowing && setIsNumberExpanded(!isNumberExpanded)}
      className={`group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-xl hover:scale-105 transition-all duration-300 ${isOverflowing ? "cursor-pointer" : "cursor-default"}`}
      title={isOverflowing ? (isNumberExpanded ? "Sembunyikan" : "Klik untuk melihat angka penuh") : ""}
    >
      <div className="relative flex items-start">
        <div className={`min-w-0 flex-1 pr-14 transition-all duration-300 ${isOverflowing && !isNumberExpanded ? "group-hover:pr-0" : ""}`}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Arus Kas
          </p>
          <h3
            ref={textRef}
            className={`font-black text-slate-900 tracking-tight transition-all duration-300 ${isNumberExpanded ? "text-[17px] sm:text-lg whitespace-nowrap tracking-tighter" : "text-2xl truncate"}`}
          >
            {displayValue}
          </h3>
        </div>

        <div className={`absolute right-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center border ${getStatusStyle(status)} transition-all duration-300 ${isOverflowing && !isNumberExpanded ? "group-hover:translate-x-4 group-hover:opacity-0 group-hover:scale-75" : ""} ${isNumberExpanded ? "opacity-0 scale-75 translate-x-4" : ""}`}>
          {status === "POSITIVE" ? <TrendingUp size={18} strokeWidth={2.5} /> : status === "NEGATIVE" ? <TrendingDown size={18} strokeWidth={2.5} /> : <Activity size={18} strokeWidth={2.5} />}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsDetailOpen(!isDetailOpen);
        }}
        className="mt-3 flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-[#1a4d2e] uppercase tracking-wider transition-colors"
      >
        {isDetailOpen ? "Sembunyikan Rincian" : "Lihat Rincian"}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isDetailOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${isDetailOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}
      >
        <div className="overflow-hidden">
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Uang Masuk</span>
              <span className="font-black text-emerald-600">{formatIDR(cashFlow?.cash_in?.total || 0)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Uang Keluar</span>
              <span className="font-black text-red-500">{formatIDR(cashFlow?.cash_out?.total || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowCard;
