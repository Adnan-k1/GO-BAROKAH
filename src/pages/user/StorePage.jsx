import { useStoreLogic } from '../../hooks/user/useStoreLogic';
import ProductCard from '../../components/common/ProductCard'; 
import FilterSidebar from '../../components/features/FilterSidebar'; 
import { ShoppingBasket } from 'lucide-react'; 

const StorePage = () => {
  const { 
    filter, categories, filteredData, totalCount, 
    currentLimit, handleFilterChange, loadMore, clearFilter,
    isLoading
  } = useStoreLogic();

  return (
    <div className="bg-[#FBFBFB] min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        
        <header className="mb-12 border-b border-gray-100 pb-8 text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Katalog <span className="text-[#2D5A43]">Produk.</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
            Pilih bahan makanan segar dan organik terbaik langsung dari petani untuk dapur sehat Anda.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar 
              categories={categories} 
              activeFilters={filter} 
              onFilterChange={handleFilterChange} 
              onClear={clearFilter} 
            />
          </aside>

          <main className="flex-1">
            <div className="text-[10px] text-gray-400 mb-6 font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gray-200"></span>
              {isLoading ? "Memuat Produk..." : `Menampilkan ${filteredData.length} dari ${totalCount} Produk`}
            </div>
            {isLoading && filteredData.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredData.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                  {filteredData.map((product) => (
                    <div key={product.id} className="bg-white">
                      <ProductCard product={product} />
                    </div>
                  ))}
                  {isLoading && [...Array(3)].map((_, i) => <ProductSkeleton key={`more-${i}`} />)}
                </div>

                {currentLimit < totalCount && (
                  <div className="mt-16 flex justify-center">
                    <button 
                      onClick={loadMore} 
                      disabled={isLoading}
                      className="bg-white border-2 border-[#2D5A43] text-[#2D5A43] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2D5A43] hover:text-white transition-all duration-300 shadow-lg shadow-green-900/5 active:scale-95 disabled:opacity-50"
                    >
                      {isLoading ? "Sabar Ya..." : "Lihat Lebih Banyak"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState onClear={clearFilter} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="bg-white p-6 animate-pulse">
    <div className="bg-gray-100 aspect-square rounded-2xl mb-6"></div>
    <div className="h-2 w-1/3 bg-gray-100 rounded-full mb-3"></div>
    <div className="h-5 w-3/4 bg-gray-100 rounded-md mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-100 rounded-md"></div>
  </div>
);

const EmptyState = ({ onClear }) => (
  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
      <ShoppingBasket size={40} />
    </div>
    <h3 className="text-xl font-bold text-gray-900">Produk Tidak Ditemukan</h3>
    <p className="text-gray-500 text-sm mt-2 mb-8 text-center max-w-xs px-6 font-medium leading-relaxed">
      Maaf, produk dengan kategori ini sedang tidak tersedia. Coba hapus filter Anda dan coba lagi.
    </p>
    <button 
      onClick={onClear}
      className="text-xs font-black text-[#2D5A43] underline tracking-widest uppercase hover:text-[#234735]"
    >
      Hapus Semua Filter
    </button>
  </div>
);

export default StorePage;