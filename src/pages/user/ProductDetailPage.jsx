import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { formatIDR } from '../../utils/formatCurrency';
import { useProductDetail } from '../../hooks/user/useProductDetail';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { user } = useAuth();
  const detail = useProductDetail(); 

  if (detail.loading) return <LoadingState />;
  if (!detail.product) return <NotFoundState />;

  const { 
    product, quantity, increase, decrease, 
    handleQuantityChange, handleBlur, onAddToCart, goBack 
  } = detail;

  const handleAddClick = () => {
    if (!user) {
      toast.error('Login dulu yuk buat belanja!', {
        icon: '🛒',
        style: { borderRadius: '16px', background: '#2D5A43', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      return;
    }
    onAddToCart();
    toast.success(`${quantity} ${product.name} masuk keranjang!`, {
      style: { fontSize: '12px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="bg-[#FBFBFB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12 animate-in fade-in duration-500">
        <BackButton onClick={goBack} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* IMAGE CONTAINER */}
          <div className="bg-white border border-gray-100 rounded-3xl md:rounded-[2.5rem] relative shadow-2xl shadow-gray-200/50 aspect-square flex items-center justify-center p-6 md:p-12 group overflow-hidden">
            {product.sale && (
              <span className="absolute top-4 left-4 md:top-8 md:left-8 bg-red-500 text-white text-[9px] md:text-[10px] font-black px-3 py-1.5 rounded-full z-10 uppercase tracking-widest shadow-lg">
                Sale {product.sale}
              </span>
            )}
            
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-in-out"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x600/FBFBFB/2D5A43?text=No+Image';
              }}
            />
          </div>

          {/* CONTENT CONTAINER */}
          <div className="flex flex-col px-2 md:px-0">
            <span className="text-[#2D5A43] font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-2 md:mb-4">
              {product.category?.name || product.category }
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full shrink-0">
                <Star size={12} className="fill-orange-400 text-orange-400" />
                <span className="text-orange-700 font-black text-[10px] md:text-xs">4.8</span>
              </div>
              <span className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-l border-gray-200 pl-4 md:pl-6 leading-none">
                Fresh Stock
              </span>
            </div>

            <div className="mb-6 md:mb-10">
              <span className="text-3xl md:text-4xl font-black text-[#2D5A43] tracking-tighter italic">
                {formatIDR(product.price)}
              </span>
            </div>

            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-8 md:mb-10 border-b border-gray-100 pb-8 md:pb-10 font-medium max-w-lg">
              {product.description || "Kualitas bahan pangan organik terbaik dari UD Barokah. Segar, sehat, dan langsung dari petani lokal untuk meja makan Anda."}
            </p>

            {/* CTA AREA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <QuantityControl 
                qty={quantity} 
                onPlus={increase} 
                onMinus={decrease} 
                onChange={handleQuantityChange}
                onBlur={handleBlur}
              />
              
              <button 
                onClick={handleAddClick} 
                className="flex-1 bg-[#2D5A43] text-white py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#234735] transition-all shadow-xl active:scale-95"
              >
                <ShoppingBag size={18} /> <span className="hidden xs:inline">Tambah Ke</span> Keranjang
              </button>

              <button className="p-4 md:p-5 border-2 border-gray-100 rounded-xl md:rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all text-gray-400 shadow-sm active:scale-90 flex items-center justify-center">
                <Heart size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENTS FOR CLEANER CODE
const BackButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A43] mb-6 md:mb-10 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all group">
    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Kembali
  </button>
);

const QuantityControl = ({ qty, onPlus, onMinus, onChange, onBlur }) => (
  <div className="flex items-center border-2 border-gray-100 rounded-xl md:rounded-2xl p-1 bg-gray-50 w-full sm:w-auto justify-between focus-within:border-[#2D5A43] focus-within:bg-white transition-all shadow-sm shrink-0">
    <button onClick={onMinus} className="p-2 md:p-2.5 hover:bg-white rounded-lg md:rounded-xl transition-all text-gray-500"><Minus size={14} /></button>
    <input 
      type="number" 
      value={qty}
      onChange={onChange}
      onBlur={onBlur}
      className="w-10 md:w-16 text-center font-black text-xs md:text-sm bg-transparent border-none focus:ring-0 p-0"
    />
    <button onClick={onPlus} className="p-2 md:p-2.5 hover:bg-white rounded-lg md:rounded-xl transition-all text-[#2D5A43]"><Plus size={14} /></button>
  </div>
);

const LoadingState = () => (
  <div className="bg-[#FBFBFB] min-h-screen">
    <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded mb-10"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        <div className="bg-gray-200 rounded-3xl aspect-square"></div>
        <div className="space-y-6">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
          <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-24 w-full bg-gray-200 rounded"></div>
          <div className="h-14 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const NotFoundState = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center bg-white min-h-screen px-6">
    <div className="bg-slate-50 p-8 rounded-full mb-6">
       <ShoppingBag size={48} className="text-slate-200" />
    </div>
    <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Produk Tidak Ada</h3>
    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8">Mungkin sudah habis atau dihapus admin.</p>
    <Link to="/store" className="bg-[#2D5A43] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10">Balik ke Katalog</Link>
  </div>
);

export default ProductDetailPage;