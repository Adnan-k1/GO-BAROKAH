import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Check, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatIDR } from '../../utils/formatCurrency';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const { user } = useAuth();
  
  const isInCart = user && cartItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    if (isInCart) return;
    if (!user) {
      toast.error('Login terlebih dahulu!');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} masuk keranjang!`);
  };

  return (
    <div className="group bg-white flex flex-col h-full border-r border-b border-gray-100 transition-all duration-500 hover:bg-[#F9FBF9]">
      {/* AREA KLIK DETAIL */}
      <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer p-4 md:p-6 flex-grow flex flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-[#F2F4F3] mb-6 shadow-sm border border-black/5">
          <img 
            src={`${API_URL}${product.image_url || product.image}`} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/400x400/FBFBFB/3A5A4D?text=No+Image'; 
            }} 
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-[#3A5A4D] font-black text-[8px] md:text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              {typeof product.category === 'object' ? product.category.name : (product.category || 'Organik')}
            </span>
          </div>
          <div className="absolute inset-0 bg-[#3A5A4D]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="bg-white p-3 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                <ArrowUpRight size={20} className="text-[#3A5A4D]" />
             </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <h4 className="text-sm md:text-lg font-black text-gray-900 uppercase tracking-tighter leading-tight group-hover:text-[#3A5A4D] transition-colors line-clamp-2">
            {product.name}
          </h4>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Rp</span>
            <span className="text-base md:text-xl font-black text-gray-900 tracking-tighter">
              {product.price.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
      
      {/* ACTION AREA - FIXED BUTTON ALIGNMENT */}
      <div className="px-4 pb-6 md:px-6 md:pb-8">
        <button 
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full h-14 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg active:scale-[0.98] border-2
            ${isInCart
              ? 'bg-[#4A6355] border-[#4A6355] text-white cursor-default opacity-90' 
              : 'bg-[#0F172A] border-[#0F172A] text-white hover:bg-[#3A5A4D] hover:border-[#3A5A4D] cursor-pointer'
            }`}
        >
          <div className="flex items-center gap-3 px-4">
            {/* ICON CONTAINER */}
            <div className="flex-shrink-0">
              {isInCart ? (
                <Check size={20} strokeWidth={4} />
              ) : (
                <ShoppingBag size={20} strokeWidth={2.5} />
              )}
            </div>

            {/* TEXT CONTAINER - Bold & Tight Leading */}
            <div className="flex flex-col items-start leading-[1.1] text-left">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] opacity-80">
                {isInCart ? "PRODUK DI" : "TAMBAH KE"}
              </span>
              <span className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.1em]">
                {isInCart ? "KERANJANG" : "KERANJANG"}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;   