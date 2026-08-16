import React, { useState, useRef, useEffect } from "react";

const VARIANT_STYLES = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  red: "bg-red-50 text-red-600 border-red-100",
};

const StatCard = ({ label, value, icon, variant = "blue" }) => {
  const Icon = icon;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef(null);

  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.blue;

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [value]);

  return (
    <div
      onClick={() => isOverflowing && setIsExpanded(!isExpanded)}
      className={`group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-xl hover:scale-105 transition-all duration-300 ${isOverflowing ? "cursor-pointer" : "cursor-default"}`}
      title={isOverflowing ? (isExpanded ? "Sembunyikan" : "Klik untuk melihat angka penuh") : ""}
    >
      <div className="relative flex items-start">
        <div className={`min-w-0 flex-1 pr-14 transition-all duration-300 ${isOverflowing && !isExpanded ? "group-hover:pr-0" : ""}`}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {label}
          </p>
          <h3
            ref={textRef}
            className={`font-black text-slate-900 tracking-tight transition-all duration-300 ${isExpanded ? "text-[17px] sm:text-lg whitespace-nowrap tracking-tighter" : "text-2xl truncate"}`}
          >
            {value}
          </h3>
        </div>

        <div className={`absolute right-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center border ${style} transition-all duration-300 ${isOverflowing && !isExpanded ? "group-hover:translate-x-4 group-hover:opacity-0 group-hover:scale-75" : ""} ${isExpanded ? "opacity-0 scale-75 translate-x-4" : ""}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
