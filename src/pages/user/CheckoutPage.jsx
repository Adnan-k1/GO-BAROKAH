import React from 'react';
import { useCheckoutLogic } from '../../hooks/user/useCheckoutLogic';
import { MapPin, Truck, Store, User, ChevronLeft, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, zones, selectedLocation, setSelectedLocation, 
    subtotal, shippingFee, total, isPickup, setIsPickup,
    namaPenerima, setNamaPenerima, alamatDetail, setAlamatDetail
  } = useCheckoutLogic();

  const isFormValid = namaPenerima && (isPickup || (selectedLocation && alamatDetail));

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
    <div className="bg-[#FBFBFB] min-h-screen pb-32 lg:pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16">
        
        {/* Navigation & Title */}
        <div className="mb-8 md:mb-12">
          <button 
            onClick={() => navigate('/cart')} 
            className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A43] mb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Keranjang
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Data <span className="text-[#2D5A43]">Pengiriman.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 items-start">
          
          <div className="lg:col-span-2 space-y-6 md:space-y-10">
            
            {/* Method Switcher */}
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl md:rounded-[2rem] border border-gray-200/50">
              <button 
                onClick={() => setIsPickup(false)} 
                className={`flex-1 py-3 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${!isPickup ? 'bg-white text-[#2D5A43] shadow-md border border-emerald-100' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Truck size={16}/> Dikirim
              </button>
              <button 
                onClick={() => setIsPickup(true)} 
                className={`flex-1 py-3 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${isPickup ? 'bg-white text-[#2D5A43] shadow-md border border-emerald-100' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Store size={16}/> Ambil Sendiri
              </button>
            </div>

            {/* Form Section */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30 space-y-6 md:space-y-8">
              
              {/* Receiver Info */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <User size={14} className="text-[#2D5A43]"/> Nama Penerima
                </label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama lengkap..." 
                  className="w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-gray-50 outline-none font-bold text-gray-800 focus:bg-white border-2 border-transparent focus:border-[#2D5A43]/20 transition-all text-sm" 
                  value={namaPenerima} 
                  onChange={(e) => setNamaPenerima(e.target.value)} 
                />
              </div>

              {/* Conditional Delivery/Pickup Info */}
              {!isPickup ? (
                <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <MapPin size={14} className="text-[#2D5A43]"/> Lokasi & Alamat
                    </label>
                    <select 
                      value={selectedLocation} 
                      onChange={(e) => setSelectedLocation(e.target.value)} 
                      className="w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-gray-50 outline-none font-black text-gray-700 cursor-pointer text-sm border-2 border-transparent focus:border-[#2D5A43]/20"
                    >
                      <option value="">Pilih Kota/Kecamatan</option>
                      {zones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                    </select>
                    <textarea 
                      placeholder="Detail Alamat (Jl, No Rumah, RT/RW)" 
                      rows="3" 
                      className="w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-gray-50 outline-none font-bold text-gray-800 focus:bg-white border-2 border-transparent focus:border-[#2D5A43]/20 transition-all text-sm" 
                      value={alamatDetail} 
                      onChange={(e) => setAlamatDetail(e.target.value)} 
                    />
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4 animate-in fade-in duration-500">
                  <Info className="text-[#2D5A43] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-[#2D5A43] uppercase tracking-widest mb-1">Lokasi Pengambilan</p>
                    <p className="text-xs text-emerald-900/70 font-medium">Jl. Pangkalan Bun No. 12, Kal-Teng. (Toko buka 08:00 - 20:00)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Summary Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-10 sticky top-32 border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="text-xl font-black mb-8 text-gray-900 uppercase tracking-tighter">Ringkasan <span className="text-[#2D5A43]">Order</span></h3>
              <div className="space-y-4 mb-10 text-xs uppercase tracking-widest font-black">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-gray-900">{subtotal}</span></div>
                <div className="flex justify-between text-gray-400"><span>Ongkir</span><span className="text-[#2D5A43]">{isPickup ? 'GRATIS' : (selectedLocation ? shippingFee : '-')}</span></div>
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-gray-900">Total</span>
                  <span className="text-2xl text-[#2D5A43] tracking-tighter leading-none">{total}</span>
                </div>
              </div>
              <button 
                disabled={!isFormValid} 
                onClick={handleNextStep}
                className="w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-[#2D5A43] text-white flex items-center justify-center gap-3 hover:bg-[#234735] shadow-lg shadow-emerald-900/10 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none transition-all active:scale-95 group"
              >
                Lanjut Pembayaran <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </aside>

        </div>
      </div>

      {/* MOBILE STICKY FOOTER - FIXED VERSION */}
<div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 pb-8 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.08)]">
  <div className="max-w-7xl mx-auto space-y-4">
    
    {/* Rincian Kecil Sebelum Tombol (Agar transparan & ringkas) */}
    <div className="flex flex-col gap-2 px-1 mb-2">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
        <span>Subtotal</span>
        <span className="text-gray-900">{subtotal}</span>
      </div>
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
        <span>Ongkir</span>
        <span className="text-[#3A5A4D]">
          {isPickup ? 'GRATIS' : (selectedLocation ? shippingFee : '-')}
        </span>
      </div>
    </div>

    {/* Baris Utama: Total & Tombol */}
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Tagihan</span>
        <span className="text-2xl font-[1000] text-[#3A5A4D] tracking-tighter leading-none">
          {isPickup ? subtotal : (selectedLocation ? total : subtotal)}
        </span>
      </div>
      
      <button 
        disabled={!isFormValid} 
        onClick={handleNextStep}
        className="flex-[1.5] bg-[#3A5A4D] text-white h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:bg-gray-100 disabled:text-gray-400 shadow-xl shadow-emerald-900/10"
      >
        Bayar <ArrowRight size={18} strokeWidth={3} />
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default CheckoutPage;