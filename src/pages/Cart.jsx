import React from 'react';
import { 
  Trash2, Minus, Plus, ShoppingBag, 
  ArrowRight 
} from 'lucide-react'; 
import { useCartLogic } from '../hooks/useCartLogic';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, subtotal, total, 
    handleIncrement, handleDecrement, handleRemove,
    isEmpty
  } = useCartLogic();

  
  const navigate = useNavigate(); 

  if (isEmpty) return <EmptyCartView />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in duration-500 text-left">
      <h1 className="text-3xl font-black mb-10 text-gray-900 tracking-tight">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
       
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onIncrement={() => handleIncrement(item)}
              onDecrement={() => handleDecrement(item)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>

       
        <div className="lg:col-span-1">
          <OrderSummary 
            subtotal={subtotal} 
            total={total} 
            onCheckout={() => navigate('/checkout')} 
          />
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
  <div className="group relative flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <button 
      onClick={onRemove}
      className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
    >
      <Trash2 size={18} />
    </button>

    <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0">
      <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
    </div>
    
    <div className="flex-grow">
      <h3 className="font-bold text-gray-900 pr-8">{item.name}</h3>
      <p className="text-[#2D5A43] font-bold text-sm mt-1">
        {item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
      </p>
    </div>

    <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2 border border-gray-100">
      <button onClick={onDecrement} className="hover:text-red-500 transition-colors">
        <Minus size={16} />
      </button>
      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
      <button onClick={onIncrement} className="hover:text-green-600 transition-colors">
        <Plus size={16} />
      </button>
    </div>
  </div>
);


const OrderSummary = ({ subtotal, total, onCheckout }) => (
  <div className="bg-[#F3F5F7] rounded-3xl p-8 sticky top-24 shadow-sm border border-gray-100">
    <h3 className="text-xl font-bold mb-6 text-gray-900">Ringkasan Pesanan</h3>
    
    <div className="space-y-4 mb-8 text-left">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Subtotal</span>
        <span className="font-bold text-gray-900">{subtotal}</span>
      </div>
      
      <p className="text-[11px] text-gray-400 italic leading-relaxed">
        * Biaya pengiriman akan dihitung pada tahap checkout setelah alamat dimasukkan.
      </p>

      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-xl font-black text-[#2D5A43]">{total}</span>
      </div>
    </div>
    
    <button 
      onClick={onCheckout}
      className="w-full bg-[#2D5A43] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#234735] transition-all shadow-xl shadow-green-900/10 active:scale-[0.98]"
    >
      Lanjut ke Checkout <ArrowRight size={18} />
    </button>
  </div>
);

const EmptyCartView = () => (
  <div className="text-center py-32">
    <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
      <ShoppingBag size={48} />
    </div>
    <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Keranjang Kosong</h2>
    <p className="text-gray-500 mb-8 font-medium">Sepertinya Anda belum menambahkan produk apapun.</p>
    <Link to="/store" className="inline-block bg-[#2D5A43] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#234735] transition-all shadow-lg shadow-green-900/10">
      Mulai Belanja
    </Link>
  </div>
);

export default Cart;