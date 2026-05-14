import React, { useState } from "react";
import { ClipboardList, Eye, ShoppingBag } from "lucide-react";
import { useHistoryLogic } from "../../hooks/user/useHistoryLogic";
import Button from "../../components/common/Button";
import OrderDetailModal from "../../components/forms/OrderDetailModal";

const HistoryPage = () => {
  const {
    orders,
    activeTab,
    setActiveTab,
    statuses,
    formatCurrency,
    handleStartShopping,
  } = useHistoryLogic();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (id) => {
    const order = orders.find((o) => o.id === id);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-[#E8F5EE] text-[#3A5A4D]";
      case "processing": return "bg-blue-50 text-blue-600";
      case "pending": return "bg-yellow-50 text-yellow-600";
      case "cancelled": return "bg-red-50 text-red-600";
      case "shipping": return "bg-orange-50 text-orange-600";
      default: return "bg-gray-50 text-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[32px] p-5 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px] md:min-h-[600px]">
      <header className="mb-6 md:mb-10 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase italic">Riwayat Pesanan</h3>
        <p className="text-xs md:text-sm text-gray-400 mt-1 font-bold uppercase tracking-widest">Pantau status belanja Anda</p>
      </header>

      {/* Tabs Responsif: Scroll di mobile, Flex-wrap di desktop */}
      <nav className="flex gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
        {statuses.map((status) => (
          <Button
            key={status}
            onClick={() => setActiveTab(status)}
            variant={activeTab === status ? "primary" : "ghost"}
            className={`px-5 md:px-7 py-2.5 md:py-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 rounded-xl ${
              activeTab === status ? "shadow-md scale-[1.02]" : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            {status}
          </Button>
        ))}
      </nav>

      <section className="space-y-6 md:space-y-8">
        {orders.length > 0 ? (
          orders.map(({ id, created_at, status, items, total_amount }) => (
            <div key={id} className="bg-white border border-gray-100 rounded-2xl md:rounded-[28px] overflow-hidden hover:shadow-[0_10px_40px_rgb(0,0,0,0.04)] transition-all duration-500 group">
              
              {/* Header Card Responsif */}
              <div className="px-5 md:px-7 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#F8FAF9]/50 border-b border-gray-50 gap-3">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="bg-[#3A5A4D] p-2.5 md:p-3 rounded-xl text-white shadow-lg shadow-green-900/10 shrink-0">
                    <ClipboardList size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-[13px] md:text-[14px] text-gray-900 leading-none truncate uppercase tracking-tighter">#{id.slice(-8)}</p>
                    <p className="text-[10px] md:text-[11px] text-gray-400 font-bold mt-1.5 uppercase tracking-wider">
                      {new Date(created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <span className={`text-[9px] md:text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-[0.15em] ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>

              {/* Items List - Hanya muncul 2 item pertama di mobile untuk ringkas */}
              <div className="px-6 md:px-8 py-5 space-y-3">
                {items.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[12px] md:text-[13px]">
                    <div className="flex items-center gap-2 min-w-0 pr-4">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-slate-600 font-bold uppercase tracking-tight truncate">{item.name}</span>
                      <span className="text-slate-400 text-[10px] font-black shrink-0">x{item.qty}</span>
                    </div>
                    <span className="font-black text-slate-900 shrink-0 italic">{formatCurrency(item.price * item.qty)}</span>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">+ {items.length - 3} produk lainnya</p>
                )}
              </div>

              {/* Footer Card Responsif */}
              <div className="px-6 md:px-8 py-5 bg-[#F8FAF9]/30 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-5">
                <div className="text-center sm:text-left">
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Total Transaksi</p>
                  <p className="text-lg md:text-xl font-black text-[#3A5A4D] tracking-tighter italic">{formatCurrency(total_amount)}</p>
                </div>
                <div className="flex gap-2 md:gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenDetail(id)} 
                    className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl"
                  >
                    <Eye size={14} /> Detail
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 sm:flex-none px-5 md:px-7 py-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl"
                    onClick={() => console.log("Beli lagi logic")}
                  >
                    Re-Order
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 md:py-28 bg-white rounded-3xl border-2 border-dashed border-slate-100 px-6">
            <div className="bg-slate-50 p-6 md:p-7 rounded-full mb-6 border border-slate-100 shadow-inner">
              <ShoppingBag size={40} className="text-[#3A5A4D] opacity-20" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase italic">Kosong, Bos!</h4>
            <p className="text-[11px] md:text-[12px] text-slate-400 max-w-[200px] md:max-w-xs mt-2 mb-8 font-bold uppercase tracking-widest leading-relaxed">Belum ada aktivitas belanja di kategori ini.</p>
            <Button variant="primary" onClick={handleStartShopping} className="px-8 md:px-10 py-3.5 md:py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-emerald-900/10">Mulai Belanja</Button>
          </div>
        )}
      </section>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default HistoryPage;