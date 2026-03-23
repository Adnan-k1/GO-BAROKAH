import React from 'react';
import { useStoreLogic } from '../hooks/useStoreLogic';
import ProductCard from '../components/ProductCard'; 
import FilterSidebar from '../components/FilterSidebar'; 

const Store = () => {
  const { 
    filter, categories, filteredData, totalCount, 
    currentLimit, handleFilterChange, loadMore, clearFilter 
  } = useStoreLogic();

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-10 py-10">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop</h1>
          <p className="text-gray-400 text-xs">Pilih bahan makanan segar terbaik untuk dapur Anda.</p>
        </header>

        <div className="flex gap-10">
          <FilterSidebar 
            categories={categories} 
            activeFilters={filter} 
            onFilterChange={handleFilterChange} 
            onClear={clearFilter} 
          />

          <main className="flex-1">
            <div className="text-[11px] text-gray-400 mb-4 font-medium uppercase tracking-widest">
              Menampilkan {filteredData.length} dari {totalCount} Produk
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-100">
              {filteredData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {currentLimit < totalCount && (
              <div className="mt-12 flex justify-center">
                <button onClick={loadMore} className="load-more-btn">
                  Lihat Lebih Banyak
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Store;