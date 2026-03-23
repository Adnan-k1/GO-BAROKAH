import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="p-5 border-r border-b border-gray-100 relative group transition-all hover:shadow-xl hover:z-10 bg-white">
      <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
      
        {product.sale && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded font-bold z-20">
            SALE {product.sale}
          </div>
        )}

       
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <ActionButton icon={<Heart className="w-3.5 h-3.5" />} />
          <ActionButton icon={<Eye className="w-3.5 h-3.5" />} />
        </div>

       
        <div className="aspect-square flex items-center justify-center p-4 mb-4 overflow-hidden">
          <img 
            src={product.img} 
            alt={product.name} 
            className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
          />
        </div>

      
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{product.category}</p>
          <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h4>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2D5A43]">{formatIDR(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-300 line-through">{formatIDR(product.oldPrice)}</span>
            )}
          </div>
          <div className="flex text-orange-400 gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
          </div>
        </div>
      </div>

      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        className="absolute bottom-5 right-5 p-3 bg-gray-50 text-gray-400 rounded-full hover:bg-[#2D5A43] hover:text-white transition-all shadow-sm active:scale-90 z-30"
      >
        <ShoppingBag className="w-5 h-5" />
      </button>
    </div>
  );
};


const ActionButton = ({ icon }) => (
  <button className="p-2 bg-white shadow-md rounded-full hover:bg-[#2D5A43] hover:text-white transition-colors">
    {icon}
  </button>
);

export default ProductCard;