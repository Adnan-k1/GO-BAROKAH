import React from "react";
import { ArrowRight } from "lucide-react";

const OrderSummary = ({ total, normalSubtotal, discountTotal, totalQuantity, hasDiscount, onCheckout }) => {
  
  return (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-6">
    <h3 className="text-base font-black mb-6 text-gray-900">
      Ringkasan <span className="text-[#2D5A43]">Belanja</span>
    </h3>

    <div className="space-y-4 mb-6">
      {hasDiscount ? (
        <>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Total Harga ({totalQuantity} barang)</span>
            <span className="text-gray-400 line-through font-medium decoration-gray-300">{normalSubtotal}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Total Diskon</span>
            <span className="text-[#00AA5B] font-bold">- {discountTotal}</span>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-gray-500 font-medium">Total Harga ({totalQuantity} barang)</span>
          <span className="text-gray-900 font-bold">{normalSubtotal || total}</span>
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="h-[1px] w-full bg-gray-100 mb-6" />

    {/* Total Keseluruhan */}
    <div className="flex flex-col gap-1.5 mb-8">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Tagihan</span>
      <span className="text-3xl text-[#2D5A43] tracking-tighter font-black leading-none">
        {total}
      </span>
    </div>

    {/* Alert Minimal Order dihapus sesuai request */}

    {/* Tombol Beli */}
    <button
      onClick={onCheckout}
      className="w-full py-4 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 bg-[#2D5A43] hover:bg-[#234735] text-white shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
    >
      <span>Checkout ({totalQuantity})</span>
      <ArrowRight size={18} strokeWidth={2.5} />
    </button>
  </div>
  );
};

export default OrderSummary;
