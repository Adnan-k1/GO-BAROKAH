import React from 'react';

const FilterSidebar = ({ categories, activeFilters, onFilterChange, onClear }) => {
  return (
    <aside className="w-48 flex-shrink-0">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-bold text-sm uppercase tracking-tighter">Filters</h3>
        {activeFilters.length > 0 && (
          <button onClick={onClear} className="text-[10px] text-red-500 font-bold hover:underline">
            Clear
          </button>
        )}
      </div>
      
      <div className="space-y-2.5">
        {categories.map(c => (
          <label key={c} className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeFilters.includes(c)}
              onChange={() => onFilterChange(c)}
              className="w-4 h-4 rounded border-gray-300 text-[#2D5A43] focus:ring-0 accent-[#2D5A43]" 
            />
            <span className={`text-[11px] transition-colors ${
              activeFilters.includes(c) ? 'text-[#2D5A43] font-bold' : 'text-gray-600 group-hover:text-black'
            }`}>
              {c}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;