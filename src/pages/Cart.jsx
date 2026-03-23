import React from 'react';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartLogic } from '../hooks/useCartLogic';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, subtotal, shipping, total, 
    handleIncrement, handleDecrement, isEmpty 
  } = useCartLogic();

  if (isEmpty) return <EmptyCartView />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-10">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onIncrement={() => handleIncrement(item)}
              onDecrement={() => handleDecrement(item)}
            />
          ))}
        </div>

        
        <div className="lg:col-span-1">
          <OrderSummary 
            subtotal={subtotal} 
            shipping={shipping} 
            total={total} 
          />
        </div>
      </div>
    </div>
  );
};



const CartItem = ({ item, onIncrement, onDecrement }) => (
  <div className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0">
      <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
    </div>
    
    <div className="flex-grow">
      <h3 className="font-bold text-gray-900">{item.name}</h3>
      <p className="text-[#2D5A43] font-bold text-sm mt-1">{item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
    </div>

    <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
      <button onClick={onDecrement} className="hover:text-red-500 transition-colors"><Minus size={16} /></button>
      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
      <button onClick={onIncrement} className="hover:text-green-600 transition-colors"><Plus size={16} /></button>
    </div>
  </div>
);

const OrderSummary = ({ subtotal, shipping, total }) => (
  <div className="bg-[#F3F5F7] rounded-3xl p-8 sticky top-24">
    <h3 className="text-xl font-bold mb-6">Ringkasan Pesanan</h3>
    <div className="space-y-4 mb-8">
      <div className="flex justify-between text-gray-500">
        <span>Subtotal</span>
        <span className="font-bold text-gray-900">{subtotal}</span>
      </div>
      <div className="flex justify-between text-gray-500">
        <span>Pengiriman</span>
        <span className="font-bold text-gray-900">{shipping}</span>
      </div>
      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-bold text-[#2D5A43]">{total}</span>
      </div>
    </div>
    <button className="w-full bg-[#2D5A43] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#234735] transition-all shadow-lg shadow-green-900/10">
      Checkout Sekarang <ArrowRight size={18} />
    </button>
  </div>
);

const EmptyCartView = () => (
  <div className="text-center py-32">
    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
      <ShoppingBag size={40} />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
    <p className="text-gray-500 mb-8">Sepertinya Anda belum menambahkan produk apapun.</p>
    <Link to="/store" className="inline-block bg-[#2D5A43] text-white px-8 py-3 rounded-full font-bold hover:bg-[#234735] transition-all">
      Mulai Belanja
    </Link>
  </div>
);

export default Cart;