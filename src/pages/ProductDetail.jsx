import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { formatIDR } from '../utils/formatCurrency';
import { useProductDetail } from '../hooks/useProductDetail';

const ProductDetail = () => {
  const { 
    product, quantity, increase, decrease, 
    handleQuantityChange, handleBlur, onAddToCart, goBack 
  } = useProductDetail();

  if (!product) return <NotFoundState />;

  return (
    <div className="bg-[#FBFBFB] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 animate-in fade-in duration-500">
        <BackButton onClick={goBack} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-12 flex items-center justify-center relative shadow-2xl shadow-gray-200/50">
            {product.sale && (
              <span className="absolute top-8 left-8 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full z-10 uppercase tracking-widest">
                Sale {product.sale}
              </span>
            )}
            <img src={product.img} alt={product.name} className="max-h-[480px] object-contain" />
          </div>

          <div className="flex flex-col pt-4">
            <span className="text-[#2D5A43] font-black text-[10px] uppercase tracking-[0.3em] mb-4">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">{product.name}</h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                <Star size={14} className="fill-orange-400 text-orange-400" />
                <span className="text-orange-700 font-black text-xs">4.8</span>
              </div>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest border-l pl-6">12 Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-4xl font-black text-[#2D5A43] tracking-tighter">{formatIDR(product.price)}</span>
              {product.oldPrice && <span className="text-xl text-gray-300 line-through font-bold">{formatIDR(product.oldPrice)}</span>}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-10 border-b border-gray-100 pb-10 font-medium">
              Produk segar berkualitas tinggi yang dipilih langsung dari mitra petani lokal UD Barokah.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <QuantityControl 
                qty={quantity} 
                onPlus={increase} 
                onMinus={decrease} 
                onChange={handleQuantityChange}
                onBlur={handleBlur}
              />
              <button onClick={onAddToCart} className="flex-1 w-full bg-[#2D5A43] text-white py-5 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#234735] transition-all shadow-xl shadow-green-900/20 active:scale-95">
                <ShoppingBag size={18} /> Tambah Ke Keranjang
              </button>
              <button className="p-5 border-2 border-gray-100 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all text-gray-400 shadow-sm">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const BackButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A43] mb-10 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
    <ArrowLeft size={14} /> Kembali ke Toko
  </button>
);

const QuantityControl = ({ qty, onPlus, onMinus, onChange, onBlur }) => (
  <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1.5 bg-gray-50 w-full sm:w-auto justify-between focus-within:border-[#2D5A43] focus-within:bg-white transition-all">
    <button onClick={onMinus} className="p-2.5 hover:bg-white rounded-xl transition-all text-gray-500"><Minus size={16} /></button>
    <input 
      type="number" 
      value={qty}
      onChange={onChange}
      onBlur={onBlur}
      className="w-16 text-center font-black text-sm bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
    <button onClick={onPlus} className="p-2.5 hover:bg-white rounded-xl transition-all text-[#2D5A43]"><Plus size={16} /></button>
  </div>
);

const NotFoundState = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <h3 className="text-xl font-bold text-gray-900">Produk Tidak Ditemukan</h3>
    <Link to="/shop" className="mt-4 text-[#2D5A43] font-black text-[10px] uppercase tracking-widest hover:underline">Balik ke Katalog</Link>
  </div>
);

export default ProductDetail;