import React, { useState, useRef, useEffect } from "react";

const InventoryStatCard = ({ label, value, icon, iconBg, items, compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative z-40 cursor-pointer ${isOpen ? 'z-[100]' : 'hover:z-[100]'}`}
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`${compact ? 'bg-white h-[52px] px-2.5 rounded-xl border-slate-100' : 'bg-white p-4 rounded-2xl border-slate-100'} border shadow-sm flex items-center gap-3 min-w-0 transition-all duration-300 relative z-20 ${isOpen ? 'rounded-b-none' : ''}`}>
        <div className={`flex-shrink-0 ${compact ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'} ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} font-black text-slate-400 uppercase tracking-wider truncate`}>
            {label}
          </span>
          <span className={`${compact ? 'text-sm' : 'text-base'} font-black text-slate-900 leading-none mt-0.5`}>
            {value}
          </span>
        </div>
      </div>

      {items && (
        <div className={`absolute top-full left-0 w-full bg-white border border-slate-100 border-t-0 shadow-xl rounded-b-2xl p-2 transition-all duration-300 ease-out max-h-64 overflow-y-auto custom-scrollbar z-[110] ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'}`}>
          {items.length > 0 ? (
            items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 px-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                <span className="text-xs font-bold text-slate-700 leading-snug mr-2 break-words">{item.name}</span>
                <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">
                  {item.stock} {item.unit || item.type?.name || 'Pcs'}
                </span>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Tidak ada data
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryStatCard;
