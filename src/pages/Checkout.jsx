import React, { useState } from 'react';
import { useCheckoutLogic } from '../hooks/useCheckoutLogic';
import { MapPin, Truck, Store, User, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { 
    cartItems, zones, selectedLocation, setSelectedLocation, 
    subtotal, shippingFee, total, isPickup, setIsPickup 
  } = useCheckoutLogic();

  const [namaPenerima, setNamaPenerima] = useState('');
  const [alamatDetail, setAlamatDetail] = useState('');

  const handleNextStep = () => {
    const orderData = {
      customerName: namaPenerima,
      items: cartItems,
      method: isPickup ? "AMBIL SENDIRI" : "DIKIRIM",
      address: isPickup ? 'Ambil di Toko (Pangkalan Bun)' : `${alamatDetail} (${selectedLocation})`,
      subtotal,
      shippingFee: isPickup ? 'Gratis' : shippingFee,
      total 
    };
    navigate('/payment', { state: { orderData } });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in duration-500 bg-white text-left">
      <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A43] mb-10 font-bold group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Keranjang
      </button>

      <h1 className="text-3xl font-black mb-10 text-gray-900 tracking-tight">Data Pengiriman</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-4 p-2 bg-gray-50 rounded-3xl border border-gray-100">
            <button onClick={() => setIsPickup(false)} className={`flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${!isPickup ? 'bg-white text-[#2D5A43] shadow-sm' : 'text-gray-400'}`}><Truck size={18}/> DIKIRIM</button>
            <button onClick={() => setIsPickup(true)} className={`flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${isPickup ? 'bg-white text-[#2D5A43] shadow-sm' : 'text-gray-400'}`}><Store size={18}/> AMBIL SENDIRI</button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest"><User size={14}/> Informasi Penerima</label>
            <input type="text" placeholder="Nama Lengkap" className="w-full p-5 rounded-2xl bg-gray-50 outline-none font-bold text-gray-800 focus:bg-white border-2 border-transparent focus:border-[#2D5A43]/10 transition-all" value={namaPenerima} onChange={(e) => setNamaPenerima(e.target.value)} />

            {!isPickup && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest"><MapPin size={14}/> Lokasi Tujuan</label>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full p-5 rounded-2xl bg-gray-50 outline-none font-black text-gray-700 cursor-pointer">
                  <option value="">Pilih Kota/Kecamatan</option>
                  {zones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                </select>
                <textarea placeholder="Detail Alamat Lengkap (Jl, No Rumah, RT/RW)" rows="3" className="w-full p-5 rounded-2xl bg-gray-50 outline-none font-bold text-gray-800 focus:bg-white border-2 border-transparent focus:border-[#2D5A43]/10 transition-all" value={alamatDetail} onChange={(e) => setAlamatDetail(e.target.value)} />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#f8faf9] rounded-[2.5rem] p-8 sticky top-24 border border-[#2D5A43]/10 shadow-sm text-left">
            <h3 className="text-xl font-black mb-8 text-gray-900">Ringkasan</h3>
            <div className="space-y-4 mb-10 text-sm font-medium">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-gray-900 font-bold">{subtotal}</span></div>
              <div className="flex justify-between text-gray-500"><span>Ongkir</span><span className="text-[#2D5A43] font-black">{isPickup ? 'GRATIS' : (selectedLocation ? shippingFee : '-')}</span></div>
            </div>
            <button 
              disabled={!namaPenerima || (!isPickup && (!selectedLocation || !alamatDetail))} 
              onClick={handleNextStep}
              className="w-full py-5 rounded-2xl font-black text-lg bg-[#2D5A43] text-white flex items-center justify-center gap-3 hover:bg-[#234735] shadow-xl disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-95"
            >
              LANJUT PEMBAYARAN <ArrowRight size={22}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;