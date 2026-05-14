import React, { useState } from 'react';
import { useStoreLogic } from '../../hooks/user/useStoreLogic';
import ProductCard from '../../components/common/ProductCard'; 
import FilterSidebar from '../../components/features/FilterSidebar'; 
import { ShoppingBasket, LayoutGrid, SlidersHorizontal, X } from 'lucide-react'; 

const StorePage = () => {
  const { 
    filter, categories, filteredData, totalCount, 
    currentLimit, handleFilterChange, loadMore, clearFilter,
    isLoading
  } = useStoreLogic();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-[#F6F8F7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6"> 
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-6 border-b border-gray-200/60 gap-4">
          <div className="max-w-xl">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">
              Katalog <span className="text-[#2D5A43]">Produk.</span>
            </h1>
            <p className="text-gray-500 font-medium text-[10px] md:text-xs mt-1 uppercase tracking-wider">
              Bahan segar langsung dari petani pilihan.
            </p>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Trigger */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#2D5A43] text-white rounded-xl shadow-sm active:scale-95 transition-all"
            >
              <SlidersHorizontal size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
            </button>

            <div className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
              <LayoutGrid size={14} className="text-[#2D5A43]" />
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
                {isLoading ? "..." : `${filteredData?.length || 0} / ${totalCount || 0}`}
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block lg:w-60 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar 
                categories={categories} 
                activeFilters={filter} 
                onFilterChange={handleFilterChange} 
                onClear={clearFilter} 
              />
            </div>
          </aside>

          {/* MOBILE FILTER OVERLAY (DRAWER) */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black uppercase tracking-widest text-[#2D5A43]">Menu Filter</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-50 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                <FilterSidebar 
                  categories={categories} 
                  activeFilters={filter} 
                  onFilterChange={handleFilterChange} 
                  onClear={clearFilter} 
                />
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full mt-10 bg-[#2D5A43] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px]"
                >
                  Terapkan
                </button>
              </div>
            </div>
          )}

          <main className="flex-1">
            {isLoading && (!filteredData || filteredData.length === 0) ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white p-4 animate-pulse">
                    <div className="bg-gray-100 aspect-square rounded-xl mb-4"></div>
                    <div className="h-3 w-3/4 bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredData && filteredData.length > 0 ? (
              <>
                {/* 2 COLUMNS ON MOBILE, 3 ON DESKTOP */}
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm shadow-emerald-900/5">
                  {filteredData.map((product) => (
                    <div key={product.id} className="bg-white"> 
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {currentLimit < totalCount && (
                  <div className="mt-12 flex justify-center">
                    <button 
                      onClick={loadMore} 
                      className="w-full md:w-auto bg-white border-2 border-gray-900 px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                    >
                      Muat Lebih Banyak
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-dashed border-gray-200">
                  <ShoppingBasket className="mx-auto text-gray-200 mb-4" size={48} />
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Produk tidak ditemukan</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StorePage;