import React, { useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCartLogic } from "../../hooks/user/useCartLogic";
import { Link, useNavigate } from "react-router-dom";
import { formatIDR } from "../../utils/formatCurrency";
import ConfirmModal from "../../components/forms/ConfirmModal";

const CartPage = () => {
  const {
    cartItems,
    subtotal,
    total,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleQuantityChange,
    isEmpty,
  } = useCartLogic();

  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    itemId: null,
    itemName: "",
  });

  const openDeleteModal = (item) => {
    setDeleteModal({
      isOpen: true,
      itemId: item.id,
      itemName: item.name,
    });
  };

  const confirmRemove = () => {
    if (deleteModal.itemId) {
      handleRemove(deleteModal.itemId);
      setDeleteModal({ isOpen: false, itemId: null, itemName: "" });
    }
  };

  if (isEmpty) return <EmptyCartView />;

  return (
    <div className="bg-[#FBFBFB] min-h-screen pb-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <button
              onClick={() => navigate("/store")}
              className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A43] mb-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Kembali Belanja
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-tight">
              Keranjang <br className="md:hidden" />
              <span className="text-[#2D5A43]">Belanja.</span>
            </h1>
          </div>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b-2 border-gray-100 pb-2 self-start">
            {cartItems.length} Produk Terpilih
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 items-start">
          {/* List Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={() => handleIncrement(item)}
                onDecrement={() => {
                  if (item.quantity <= 1) {
                    openDeleteModal(item);
                  } else {
                    handleDecrement(item);
                  }
                }}
                onRemove={() => openDeleteModal(item)}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          {/* Desktop Summary - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1 sticky top-32">
            <OrderSummary
              subtotal={subtotal}
              total={total}
              onCheckout={() => navigate("/checkout")}
            />
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Tagihan</span>
            <span className="text-xl font-black text-[#2D5A43] tracking-tighter">{total}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="flex-1 bg-[#2D5A43] text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, itemId: null, itemName: "" })}
        onConfirm={confirmRemove}
        title="Hapus Produk?"
        message={`Hapus "${deleteModal.itemName}" dari keranjang?`}
        confirmText="Ya, Hapus"
      />
    </div>
  );
};

const CartItem = ({ item, onIncrement, onDecrement, onRemove, onQuantityChange }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      onQuantityChange(item.id, val);
    }
  };

  return (
    <div className="group relative flex flex-row items-center gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
      {/* Image */}
      <div className="w-20 h-20 md:w-32 md:h-32 bg-[#FBFBFB] rounded-2xl md:rounded-3xl flex-shrink-0 overflow-hidden border border-gray-50">
        <img
          src={`${API_URL}${item.image_url || item.image}`}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/400x400/FBFBFB/3A5A4D?text=No+Image'; 
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <span className="text-[#2D5A43] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] opacity-60 truncate block">
          {typeof item.category === 'object' ? item.category.name : (item.category || "Kategori")}
        </span>
        <h3 className="text-sm md:text-lg font-black text-gray-900 tracking-tight mt-0.5 truncate">
          {item.name}
        </h3>
        <p className="text-[#2D5A43] font-black text-xs md:text-sm mt-1">
          {formatIDR(item.price)}
        </p>

        {/* Mobile Quantity Controls (Below text on small screens) */}
        <div className="flex items-center gap-2 mt-3 md:hidden">
          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
            <button onClick={onDecrement} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm"><Minus size={10}/></button>
            <input type="number" readOnly value={item.quantity} className="w-8 bg-transparent text-center font-black text-[11px]" />
            <button onClick={onIncrement} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm"><Plus size={10}/></button>
          </div>
          <button onClick={onRemove} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
        </div>
      </div>
      
      {/* Desktop Controls */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
          <button onClick={onDecrement} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl hover:text-red-500 shadow-sm transition-all active:scale-90"><Minus size={14} /></button>
          <input type="number" value={item.quantity} onChange={handleChange} className="w-12 bg-transparent text-center font-black text-sm text-gray-900 focus:outline-none" />
          <button onClick={onIncrement} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl hover:text-[#2D5A43] shadow-sm transition-all active:scale-90"><Plus size={14} /></button>
        </div>
        <button onClick={onRemove} className="p-4 text-gray-300 hover:text-red-500 transition-all"><Trash2 size={20} /></button>
      </div>
    </div>
  );
};

const OrderSummary = ({ subtotal, total, onCheckout }) => (
  <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col">
    <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 text-gray-900 tracking-tight uppercase border-b border-gray-50 pb-6">
      Ringkasan <span className="text-[#2D5A43]">Order</span>
    </h3>

    <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
      <div className="flex justify-between items-center text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-400">
        <span>Subtotal Pesanan</span>
        <span className="text-gray-900">{subtotal}</span>
      </div>

      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="text-[9px] md:text-[10px] text-gray-400 font-medium leading-relaxed ">
          * Biaya pengiriman dikalkulasi di halaman Checkout.
        </p>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Tagihan</span>
          <span className="text-2xl md:text-3xl font-black text-[#2D5A43] tracking-tighter leading-none">{total}</span>
        </div>
      </div>
    </div>

    <button
      onClick={onCheckout}
      className="w-full bg-[#2D5A43] text-white py-5 md:py-6 rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#234735] transition-all active:scale-95 shadow-lg shadow-green-900/10"
    >
      Lanjut ke Pembayaran <ArrowRight size={18} />
    </button>
  </div>
);

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center px-6 py-20 bg-white min-h-screen">
    <div className="bg-[#FBFBFB] w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mb-6 md:mb-8 text-gray-200 border border-gray-50">
      <ShoppingBag size={40} md:size={48} strokeWidth={1.5} />
    </div>
    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase text-center">
      Keranjang Kosong
    </h2>
    <p className="text-gray-400 mb-10 font-medium max-w-xs text-center text-sm leading-relaxed">
      Wah, keranjangmu masih sepi nih. Yuk, cari kebutuhan harianmu sekarang!
    </p>
    <Link
      to="/store"
      className="w-full md:w-auto text-center bg-[#2D5A43] text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] active:scale-95 shadow-lg shadow-green-900/10"
    >
      Mulai Belanja
    </Link>
  </div>
);

export default CartPage;