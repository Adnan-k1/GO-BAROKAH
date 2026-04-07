import { useStoreLogic } from '../hooks/useStoreLogic';
import ProductCard from '../components/common/ProductCard'; 
import FilterSidebar from '../components/features/FilterSidebar'; 
import { ShoppingBasket } from 'lucide-react'; // Tambah icon untuk kondisi kosong

const Store = () => {
  const { 
    filter, categories, filteredData, totalCount, 
    currentLimit, handleFilterChange, loadMore, clearFilter 
  } = useStoreLogic();

  return (
    <div className="bg-[#FBFBFB] min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-gray-100 pb-8 text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Katalog <span className="text-[#2D5A43]">Produk.</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
            Pilih bahan makanan segar dan organik terbaik langsung dari petani untuk dapur sehat Anda.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar 
              categories={categories} 
              activeFilters={filter} 
              onFilterChange={handleFilterChange} 
              onClear={clearFilter} 
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Counter */}
            <div className="text-[10px] text-gray-400 mb-6 font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gray-200"></span>
              Menampilkan {filteredData.length} dari {totalCount} Produk
            </div>

            {filteredData.length > 0 ? (
              <>
                {/* Grid Produk - Menggunakan gap-px dan bg-gray-100 untuk border tipis mewah */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                  {filteredData.map((product) => (
                    <div key={product.id} className="bg-white">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Tombol Load More */}
                {currentLimit < totalCount && (
                  <div className="mt-16 flex justify-center">
                    <button 
                      onClick={loadMore} 
                      className="bg-white border-2 border-[#2D5A43] text-[#2D5A43] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2D5A43] hover:text-white transition-all duration-300 shadow-lg shadow-green-900/5 active:scale-95"
                    >
                      Lihat Lebih Banyak
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Tampilan Jika Produk Tidak Ditemukan */
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                  <ShoppingBasket size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Produk Tidak Ditemukan</h3>
                <p className="text-gray-500 text-sm mt-2 mb-8 text-center max-w-xs px-6 font-medium leading-relaxed">
                  Maaf, produk dengan kategori ini sedang tidak tersedia. Coba hapus filter Anda.
                </p>
                <button 
                  onClick={clearFilter}
                  className="text-xs font-black text-[#2D5A43] underline tracking-widest uppercase hover:text-[#234735]"
                >
                  Hapus Semua Filter
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