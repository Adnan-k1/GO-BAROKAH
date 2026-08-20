import React, { useRef, useEffect } from "react";
import { Search } from "lucide-react";

const ProductFilterBar = ({ search, onSearchChange, activecat, onCatChange, categories = [] }) => {
  const activeCategoryIds = Array.isArray(activecat) ? activecat.map(String) : [];
  const filterOptions = [
    { id: "all", name: "Semua" },
    ...categories.map((category) => ({
      id: String(category.id ?? category._id),
      name: category.name,
    })),
  ];
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="bg-white p-2 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-2 transition-all focus-within:ring-1 focus-within:ring-emerald-500/20">
      <div className="relative w-full md:flex-1 md:min-w-0 group">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1a4d2e] transition-colors" />
        <input
          type="text"
          placeholder="Cari nama barang..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium shadow-none"
        />
      </div>

      <div className="hidden md:block w-px h-7 bg-slate-200 flex-shrink-0" />

      <div ref={scrollRef} className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
        {filterOptions.map((category) => {
          const isActive = category.id === "all"
            ? activeCategoryIds.length === 0
            : activeCategoryIds.includes(category.id);

          return (
            <button
              key={category.id}
              onClick={() => onCatChange(category.id === "all" ? "all" : category.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 border
                ${isActive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-slate-400 border-transparent hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"}`}
            >
              {category.id === "all" ? "ALL" : category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilterBar;
