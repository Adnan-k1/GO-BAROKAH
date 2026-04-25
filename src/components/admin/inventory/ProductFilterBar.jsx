import React from "react";
import { Search } from "lucide-react";

const CATEGORIES = ["Semua", "Minuman", "Makanan", "Snack", "Bumbu"];

/**
 * ProductFilterBar
 * Search input + filter kategori.
 *
 * @param {string}   search
 * @param {function} onSearchChange
 * @param {string}   activecat
 * @param {function} onCatChange
 */
const ProductFilterBar = ({ search, onSearchChange, activecat, onCatChange }) => (
  <div className="bg-white px-5 py-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
    {/* Category pills */}
    <div className="flex items-center gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCatChange(cat)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all
            ${activecat === cat
              ? "bg-[#1a4d2e] text-white shadow-sm"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Search */}
    <div className="relative w-60 flex-shrink-0">
      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        type="search"
        placeholder="Cari barang..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300/60 transition-all placeholder:text-slate-300"
      />
    </div>
  </div>
);

export default ProductFilterBar;