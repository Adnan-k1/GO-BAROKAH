import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePaymentLogic } from '../../hooks/user/usePaymentLogic';
import { useAuth } from '../../context/AuthContext';
import { 
  Landmark, Loader2, CreditCard, Banknote, 
  BookOpenCheck, ChevronLeft, ArrowRight 
} from 'lucide-react';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { processOrder, loading } = usePaymentLogic();
  const [selectedMethod, setSelectedMethod] = useState('');
  
  const order = state?.orderData;

  const paymentOptions = [
    { id: 'cod', name: 'Bayar di Tempat (COD)', icon: <Banknote size={20}/>, public: true },
    { id: 'va', name: 'Virtual Account / Transfer', icon: <Landmark size={20}/>, public: true },
    { id: 'cc', name: 'Kartu Kredit / Debit', icon: <CreditCard size={20}/>, public: true },
    { id: 'debt', name: 'Hutang / Nota Buku', icon: <BookOpenCheck size={20}/>, public: false },
  ];

  const availablePayments = paymentOptions.filter(opt => opt.public || user?.canDebt);

  if (!order) return null;

  const handleFinalConfirm = () => {
    const methodInfo = paymentOptions.find(p => p.id === selectedMethod);
    const finalOrder = { ...order, paymentMethod: selectedMethod, paymentName: methodInfo.name };
    processOrder(finalOrder); 
  };

  return (
    <div className="bg-[#FBFBFB] min-h-screen pb-32 lg:pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16">
        
        {/* Navigation */}
        <div className="mb-8 md:mb-12">
          <button 
            onClick={() => navigate('/checkout')} 
            className="flex items-center gap-2 text-gray-400 hover:text-[#3A5A4D] mb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Data Pengiriman
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none italic">
            Metode <span className="text-[#3A5A4D]">Pembayaran.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 items-start">
          
          {/* KIRI: Pilihan Metode Pembayaran */}
          <div className="lg:col-span-2 space-y-4">
            {availablePayments.map((pay) => (
              <button
                key={pay.id}
                onClick={() => setSelectedMethod(pay.id)}
                className={`w-full flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[2rem] border-2 transition-all text-left group ${
                  selectedMethod === pay.id 
                  ? 'border-[#3A5A4D] bg-[#3A5A4D]/5 shadow-xl shadow-emerald-900/5' 
                  : 'border-gray-50 bg-white hover:border-gray-100 shadow-sm'
                }`}
              >
                <div className={`p-4 rounded-2xl transition-colors shrink-0 ${
                  selectedMethod === pay.id ? 'bg-[#3A5A4D] text-white' : 'bg-gray-50 text-gray-400'
                }`}>
                  {pay.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`font-black text-sm md:text-base uppercase tracking-tight leading-tight ${
                    selectedMethod === pay.id ? 'text-[#3A5A4D]' : 'text-gray-900'
                  }`}>
                    {pay.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {pay.id === 'cod' ? 'Bayar saat barang sampai' : 'Verifikasi otomatis via sistem'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* KANAN: Desktop Sidebar (Sama seperti Checkout) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-10 sticky top-32 border border-gray-100 shadow-xl shadow-gray-200/40">
              <div className="mb-8 pb-8 border-b border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Dikirim ke</p>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">{order.customerName}</h3>
                <p className="text-xs font-bold text-gray-400 mt-2 leading-relaxed">{order.address}</p>
              </div>

              <div className="space-y-4 mb-10 text-xs uppercase tracking-widest font-black">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-gray-900">{order.subtotal}</span></div>
                <div className="flex justify-between text-gray-400"><span>Ongkir</span><span className="text-[#3A5A4D]">{order.shippingFee}</span></div>
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-gray-900">Total</span>
                  <span className="text-2xl text-[#3A5A4D] tracking-tighter leading-none italic font-[1000]">{order.total}</span>
                </div>
              </div>

              <button 
                disabled={!selectedMethod || loading} 
                onClick={handleFinalConfirm}
                className="w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-[#3A5A4D] text-white flex items-center justify-center gap-3 hover:bg-[#2d453b] shadow-lg disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-95 group"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Konfirmasi Pesanan <ArrowRight size={18} /></>}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE STICKY FOOTER (SAMA PERSIS DENGAN CHECKOUTPAGE) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 pb-8 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Rincian Kecil (Subtotal & Ongkir) */}
          <div className="flex flex-col gap-2 px-1 mb-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span>Subtotal</span>
              <span className="text-gray-900">{order.subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span>Ongkir</span>
              <span className="text-[#3A5A4D]">{order.shippingFee}</span>
            </div>
          </div>

          {/* Baris Utama: Total & Tombol */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Tagihan</span>
              <span className="text-2xl font-[1000] text-[#3A5A4D] tracking-tighter leading-none italic">
                {order.total}
              </span>
            </div>
            
            <button 
              disabled={!selectedMethod || loading} 
              onClick={handleFinalConfirm}
              className="flex-[1.5] bg-[#3A5A4D] text-white h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:bg-gray-100 disabled:text-gray-400 shadow-xl shadow-emerald-900/10"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Konfirmasi <ArrowRight size={18} strokeWidth={3} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;