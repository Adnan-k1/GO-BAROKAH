import React, { useState, useEffect, useMemo } from "react";
import { productService } from "../../services/user/productService";
import { useProductFilter } from "../../hooks/user/useProductFilter";
import { formatIDR } from "../../utils/formatCurrency";
import { ArrowUpRight, Loader2, SlidersHorizontal } from "lucide-react";

const ProductSection = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await productService.getAllProducts();
        const actualData = Array.isArray(response) ? response : response?.data || response?.products || [];
        setProducts(actualData);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products?.map((p) => p.category?.name || p.category) || [])].filter(Boolean);
  }, [products]);

  const filteredProducts = useProductFilter(products, searchQuery, activeFilters);

  const toggleFilter = (catName) => {
    setActiveFilters((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [catName]
    );
  };

  if (loading) return (
    <div className="py-40 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[#2D5A43]" size={40} />
      <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400">Loading Produk...</p>
    </div>
  );

  return (
    <div className="bg-[#FBFBFB] font-sans overflow-hidden">
      {/* KATEGORI SECTION */}
      <section className="max-w-7xl mx-auto py-12 md:py-24 px-5 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-[64px] font-black text-gray-900 leading-[0.85] tracking-tighter uppercase">
              KATEGORI <br />
              <span className="text-[#2D5A43]">PILIHAN.</span>
            </h2>
            <p className="text-gray-500 text-[13px] md:text-base font-medium max-w-xs">
              Produk segar pilihan langsung dari distributor terbaik.
            </p>
          </div>
          <button 
            onClick={() => setActiveFilters([])}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2D5A43] sm:text-gray-400"
          >
            <SlidersHorizontal size={14} />
            {activeFilters.length > 0 ? "Reset Filter" : "Semua Produk"}
          </button>
        </div>

        {/* Category Scrollable (Mobile) / Grid (Desktop) */}
        <div className="flex overflow-x-auto pb-6 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 no-scrollbar">
          {categories.map((cat, index) => {
            const active = activeFilters.includes(cat);
            return (
              <div
                key={index}
                onClick={() => toggleFilter(cat)}
                className={`flex-shrink-0 min-w-[140px] sm:min-w-0 p-5 md:p-8 rounded-[2rem] cursor-pointer transition-all border-2 ${
                  active ? "border-[#2D5A43] bg-white shadow-xl scale-95" : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 md:w-14 md:h-14 mb-4 rounded-full flex items-center justify-center font-black text-sm md:text-xl transition-colors ${active ? "bg-[#2D5A43] text-white" : "bg-gray-50 text-[#2D5A43]"}`}>
                  {cat.charAt(0)}
                </div>
                <p className={`font-black uppercase text-[10px] tracking-widest ${active ? "text-[#2D5A43]" : "text-gray-800"}`}>
                  {cat}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUK SECTION */}
      <section className="max-w-7xl mx-auto py-12 md:py-24 px-5 lg:px-12 border-t border-gray-100">
        <h2 className="text-4xl md:text-[56px] font-black text-gray-900 mb-12 tracking-tighter uppercase">
          PRODUK <span className="text-[#2D5A43]">KAMI.</span>
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-16">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-white rounded-[2rem] md:rounded-[3.5rem] border border-gray-100 p-2 md:p-4 mb-4 md:mb-8 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={`${API_URL}${prod.image_url || prod.image}`}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.8rem] group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-[#2D5A43] group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-[9px] font-black text-[#2D5A43] uppercase tracking-widest opacity-60 mb-1">
                    {prod.category?.name || prod.category || "General"}
                  </p>
                  <h3 className="font-black text-gray-900 text-base md:text-2xl uppercase tracking-tighter truncate">
                    {prod.name}
                  </h3>
                  <p className="text-gray-400 font-bold text-sm md:text-lg">
                    {formatIDR(prod.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Produk tidak tersedia</p>
          </div>
        )}
      </section>
    </div>
  );
};
export default ProductSection;