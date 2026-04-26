import React from "react";

const InventoryStatCard = ({ label, value, icon, iconBg }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 min-w-0">
      <div className={`flex-shrink-0 w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider truncate">
          {label}
        </span>
        <span className="text-base font-black text-slate-900 leading-none mt-0.5">
          {value}
        </span>
      </div>
    </div>
  );
};

export default InventoryStatCard;