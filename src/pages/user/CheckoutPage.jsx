import React, { useState, useEffect } from "react"; 
import { useCheckoutLogic } from "../../hooks/user/useCheckoutLogic";
import { usePaymentLogic } from "../../hooks/user/usePaymentLogic";
import { useAuth } from "../../context/AuthContext";
import { 
  Truck, Store, ChevronLeft, ArrowRight, Info, FileText, 
  Landmark, Loader2, CreditCard, Banknote, BookOpenCheck 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addressService } from "../../services/user/addressService"; 

import CustomAddressSelector from "../../components/forms/CustomAddressSelector"; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems, subtotal, shippingFee, total,
    isPickup, setIsPickup,
    alamatDetail, setAlamatDetail,
  } = useCheckoutLogic();

  const { processOrder, loading } = usePaymentLogic();

  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(""); 

  const paymentOptions = [
    { id: 'cod', name: 'Bayar di Tempat (COD)', desc: 'Bayar saat barang sampai', icon: <Banknote size={18} />, public: true },
    { id: 'va', name: 'Virtual Account / Transfer', desc: 'Transfer ke rekening tujuan', icon: <Landmark size={18} />, public: true },
    { id: 'cc', name: 'Kartu Kredit / Debit', desc: 'Verifikasi otomatis via sistem', icon: <CreditCard size={18} />, public: true },
    { id: 'debt', name: 'Hutang / Nota Buku', desc: 'Dicatat sebagai piutang toko', icon: <BookOpenCheck size={18} />, public: false },
  ];

  const availablePayments = paymentOptions.filter(opt => opt.public || user?.canDebt);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await addressService.getAddresses();
        const data = response.data?.data || response.data || response;
        const addressList = Array.isArray(data) ? data : [];

        setUserAddresses(addressList);

        if (addressList.length > 0) {
          const firstAddressId = addressList[0].id?.toString() || "";
          setSelectedAddressId(firstAddressId);

          const initialAddress = addressList[0];
          setAlamatDetail(initialAddress.addressDetail || "");
        }
      } catch (error) {
        console.error("Gagal load alamat asli user:", error);
      }
    };

    if (!isPickup) {
      fetchUserAddresses();
    }
  }, [isPickup, setAlamatDetail]); 

  const isFormValid = (isPickup || selectedAddressId) && selectedMethod;

  const handleConfirmOrder = () => {
    const methodInfo = paymentOptions.find(p => p.id === selectedMethod);
    
    const orderData = {
      addressId: isPickup ? 0 : Number(selectedAddressId),
      notes: orderNotes.trim() !== "" ? orderNotes : undefined, 
      paymentMethod: selectedMethod,
      paymentName: methodInfo?.name
    };

    processOrder(orderData, navigate);
  };

  const displayTotal = isPickup ? subtotal : selectedAddressId ? total : subtotal;

  const renderPaymentMethods = () => (
    <div className="space-y-3">
      {availablePayments.map((pay) => {
        const isSelected = selectedMethod === pay.id;
        return (
          <button
            key={pay.id}
            onClick={() => setSelectedMethod(pay.id)}
            className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border-2 transition-all text-left group
              ${isSelected
                ? 'border-[#2D5A43] bg-[#2D5A43]/5 shadow-sm'
                : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
          >
            <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors
              ${isSelected ? 'bg-[#2D5A43] text-white' : 'bg-gray-50 text-gray-400 group-hover:text-gray-600'}`}>
              {pay.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`font-black text-xs tracking-tight leading-tight truncate
                ${isSelected ? 'text-[#2D5A43]' : 'text-gray-900'}`}>
                {pay.name}
              </span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                {pay.desc}
              </span>
            </div>
            <div className={`ml-auto flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
              ${isSelected ? 'border-[#2D5A43] bg-[#2D5A43]' : 'border-gray-200'}`}>
              {isSelected && (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="bg-[#FBFBFB] min-h-screen pb-36 lg:pb-12 text-left font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="mb-6 lg:mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-1.5 text-gray-400 hover:text-[#2D5A43] mb-3 text-[9px] font-black uppercase tracking-[0.2em] transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Keranjang
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Checkout <span className="text-[#2D5A43]">Pesanan.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-8 items-start">
          <div className="lg:col-span-3 space-y-5 lg:space-y-6">
            <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 space-y-5">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">
                Data <span className="text-[#2D5A43]">Pengiriman</span>
              </h3>
              
              <div className="flex gap-1.5 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                <button
                  onClick={() => setIsPickup(false)}
                  className={`flex-1 py-2.5 lg:py-3.5 rounded-xl font-black text-[10px] flex items-center justify-center gap-1.5 transition-all uppercase tracking-widest
                    ${!isPickup ? "bg-white text-[#2D5A43] shadow-sm border border-emerald-100" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Truck size={13} /> Dikirim
                </button>
                <button
                  onClick={() => setIsPickup(true)}
                  className={`flex-1 py-2.5 lg:py-3.5 rounded-xl font-black text-[10px] flex items-center justify-center gap-1.5 transition-all uppercase tracking-widest
                    ${isPickup ? "bg-white text-[#2D5A43] shadow-sm border border-emerald-100" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Store size={13} /> Ambil Sendiri
                </button>
              </div>
              
              {!isPickup ? (
                <CustomAddressSelector 
                  userAddresses={userAddresses}
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                  alamatDetail={alamatDetail}
                  setAlamatDetail={setAlamatDetail}
                />
              ) : (
                <div className="px-4 py-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
                  <Info className="text-[#2D5A43] shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-[9px] font-black text-[#2D5A43] uppercase tracking-widest mb-1">
                      Lokasi Pengambilan
                    </p>
                    <p className="text-xs text-emerald-900/70 font-medium leading-relaxed">
                      UD. BAROKAH<br/>
                      Jalan Kecubung No.D136, RT.002, Pasir Panjang, Kec. Arut
                      Sel., Kabupaten Kotawaringin Barat, Kalimantan Tengah
                      74181
                    </p>
                  </div>
                </div>
              )}
              
              <div className="pt-2 border-t border-dashed border-gray-200 space-y-2.5 mt-2">
                <label className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <FileText size={11} className="text-[#2D5A43]" /> Catatan Pesanan <span className="lowercase text-gray-300 tracking-normal font-medium">(Opsional)</span>
                </label>
                <textarea
                  placeholder={isPickup ? "Contoh: Tolong siapkan jam 3 sore..." : "Contoh: Titip ke pos satpam jika saya tidak ada di rumah..."}
                  rows="2"
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 outline-none font-bold text-gray-800 text-sm border border-gray-100 focus:border-[#2D5A43]/30 focus:bg-white transition-all resize-none"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="lg:hidden bg-white p-5 sm:p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 space-y-4">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4 mb-2">
                Metode <span className="text-[#2D5A43]">Pembayaran</span>
              </h3>
              {renderPaymentMethods()}
            </div>

          </div>
          
          <aside className="hidden lg:block lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 sticky top-8 border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="text-sm font-black mb-4 text-gray-900 uppercase tracking-widest">
                Metode <span className="text-[#2D5A43]">Pembayaran</span>
              </h3>
              <div className="mb-8">
                {renderPaymentMethods()}
              </div>
              <h3 className="text-sm font-black mb-5 text-gray-900 uppercase tracking-widest pt-6 border-t border-gray-100">
                Ringkasan <span className="text-[#2D5A43]">Order</span>
              </h3>
              <div className="space-y-3 mb-6 text-[11px] uppercase tracking-widest font-black">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-800">{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Ongkir</span>
                  <span className="text-[#2D5A43]">
                    {isPickup ? "Gratis" : selectedAddressId ? shippingFee : "—"}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-900">Total</span>
                  <span className="text-xl text-[#2D5A43] tracking-tighter font-black leading-none">
                    {displayTotal}
                  </span>
                </div>
              </div>

              <button
                disabled={!isFormValid || loading}
                onClick={handleConfirmOrder}
                className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-[#2D5A43] text-white flex items-center justify-center gap-2 hover:bg-[#234735] shadow-lg shadow-emerald-900/10 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none transition-all active:scale-95 group"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Konfirmasi Pesanan
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </aside>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 pt-2.5 pb-5 z-50 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
            <span>
              Subtotal <span className="text-gray-700">{subtotal}</span>
            </span>
            <span className="text-gray-200">·</span>
            <span>
              Ongkir{" "}
              <span className="text-[#2D5A43]">
                {isPickup ? "Gratis" : selectedAddressId ? shippingFee : "—"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Total</span>
              <span className="text-base font-black text-[#2D5A43] tracking-tighter leading-tight truncate">
                {displayTotal}
              </span>
            </div>
            <button
              disabled={!isFormValid || loading}
              onClick={handleConfirmOrder}
              className="flex-1 bg-[#2D5A43] text-white h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:bg-gray-100 disabled:text-gray-400 shadow-lg shadow-emerald-900/10"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Konfirmasi"}
              {!loading && <ArrowRight size={14} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;