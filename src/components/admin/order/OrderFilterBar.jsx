import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";

const OrderFilterBar = ({ search, onSearchChange, activeStatus, onStatusChange, statuses = [] }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="bg-white p-2 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-2 transition-all focus-within:ring-1 focus-within:ring-emerald-500/20">
      <div className="relative w-full md:flex-1 md:min-w-0 group">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1a4d2e] transition-colors" />
        <input
          type="text"
          placeholder="Cari transaksi..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium shadow-none"
        />
      </div>

      <div className="hidden md:block w-px h-7 bg-slate-200 flex-shrink-0" />

      <div ref={scrollRef} className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
        {statuses.map((status) => {
          const isActive = activeStatus === status;

          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-slate-400 border-transparent hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderFilterBar;
