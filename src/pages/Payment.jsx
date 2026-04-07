import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePaymentLogic } from '../hooks/usePaymentLogic';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, MessageCircle, Landmark, Loader2, 
  CreditCard, Banknote, BookOpenCheck, ChevronLeft 
} from 'lucide-react';

const Payment = () => {
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

  if (!order) return <div className="p-20 text-center font-bold">Data pesanan tidak ditemukan.</div>;

  const handleFinalConfirm = () => {
    const methodInfo = paymentOptions.find(p => p.id === selectedMethod);
    const finalOrder = { ...order, paymentMethod: selectedMethod, paymentName: methodInfo.name };
    processOrder(finalOrder); 
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 animate-in fade-in duration-500 text-left">
      <button onClick={() => navigate('/checkout')} className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A43] mb-10 font-bold transition-all group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Alamat
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Pilih Pembayaran</h1>
          <div className="grid grid-cols-1 gap-4">
            {availablePayments.map((pay) => (
              <button
                key={pay.id}
                onClick={() => setSelectedMethod(pay.id)}
                className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all text-left ${
                  selectedMethod === pay.id 
                  ? 'border-[#2D5A43] bg-[#2D5A43]/5 text-[#2D5A43]' 
                  : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                }`}
              >
                <div className={`p-3 rounded-xl ${selectedMethod === pay.id ? 'bg-[#2D5A43] text-white' : 'bg-white'}`}>
                  {pay.icon}
                </div>
                <span className="font-black text-sm">{pay.name}</span>
              </button>
            ))}
          </div>
        </div>

       
        <div className="bg-[#f8faf9] rounded-[3rem] p-10 border border-[#2D5A43]/10 h-fit">
          <div className="mb-8 pb-8 border-b border-gray-200">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Penerima</p>
             <p className="font-black text-gray-900">{order.customerName}</p>
             <p className="text-xs text-gray-500 mt-1">{order.address}</p>
          </div>

          <div className="mb-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Pembayaran</p>
            <p className="text-4xl font-black text-[#2D5A43]">{order.total}</p>
          </div>

          <button 
            onClick={handleFinalConfirm}
            disabled={!selectedMethod || loading}
            className="w-full bg-[#2D5A43] text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:bg-[#234735] shadow-2xl transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <MessageCircle size={24} />}
            KONFIRMASI PESANAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;