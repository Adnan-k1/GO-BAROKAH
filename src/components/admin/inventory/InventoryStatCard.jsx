import React from "react";

/**
 * InventoryStatCard
 * Card statistik ringkasan di halaman inventory.
 *
 * @param {string}      label
 * @param {string|number} value
 * @param {ReactNode}   icon
 * @param {string}      iconBg   - Tailwind class bg + text color
 */
const InventoryStatCard = ({ label, value, icon, iconBg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

export default InventoryStatCard;