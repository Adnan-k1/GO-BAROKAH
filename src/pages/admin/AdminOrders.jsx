import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Eye, Search, Loader2, ShoppingCart, Clock,
  Package, CheckCircle2, Truck, XCircle, Briefcase, RotateCcw, Store, Ban
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import InventoryStatCard from "../../components/admin/inventory/InventoryStatCard";
import OrderDetailModal from "../../components/admin/order/OrderDetailModal";
import { useAdminOrders } from "../../hooks/admin/useAdminOrders";
import { formatRupiah } from "../../utils/formatters";

const PER_PAGE = 10;
const TABS = ["Semua", "Menunggu", "Disiapkan", "Dapat Diambil", "Dikirim", "Selesai", "Dibatalkan"];

const STATUS_CONFIG = {
  Menunggu: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: <Clock size={10} /> },
  Disiapkan: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", icon: <Package size={10} /> },
  "Dapat Diambil": { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", icon: <Store size={10} /> },
  Dikirim: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", icon: <Truck size={10} /> },
  Selesai: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", icon: <CheckCircle2 size={10} /> },
  Dibatalkan: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", icon: <XCircle size={10} /> },
};

const AdminOrders = () => {
  const { orders, isLoading, handleUpdateStatus } = useAdminOrders();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");
  const [page, setPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableScrollRef = useRef(null);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const onScroll = () => setIsScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchTab = activeTab === "Semua" || o.status === activeTab;
      const matchSearch = o.customer_name?.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search);
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, search]);

  const totalPages = Math.ceil(filteredOrders.length / PER_PAGE) || 1;
  const paginatedItems = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === "Menunggu").length,
    processing: orders.filter(o => o.status === "Disiapkan").length,
    ready: orders.filter(o => o.status === "Dapat Diambil").length,
    shipping: orders.filter(o => o.status === "Dikirim").length,
    finished: orders.filter(o => o.status === "Selesai").length,
  }), [orders]);

  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const ActionButtons = ({ order }) => {
    const btnClass = "p-2.5 rounded-xl transition-all shadow-sm border active:scale-95";
    
    return (
      <div className="flex gap-2">
        <button onClick={() => openDetail(order)} className={`${btnClass} bg-white text-slate-400 border-slate-100 hover:text-slate-900 hover:border-slate-300`}>
          <Eye size={14} />
        </button>

        {order.status === "Menunggu" && (
          <>
            <button onClick={() => handleUpdateStatus(order.id, "Disiapkan")} className={`${btnClass} bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-[#1a4d2e] hover:text-white`}>
              <Briefcase size={14} strokeWidth={2.5} />
            </button>
            <button onClick={() => handleUpdateStatus(order.id, "Dibatalkan")} className={`${btnClass} bg-red-50 text-red-500 border-red-100 hover:bg-red-500 hover:text-white`}>
              <Ban size={14} />
            </button>
          </>
        )}

        {order.status === "Disiapkan" && (
          <button onClick={() => handleUpdateStatus(order.id, order.is_pickup ? "Dapat Diambil" : "Dikirim")} 
            className={`${btnClass} ${order.is_pickup ? "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-600" : "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600"} hover:text-white`}>
            {order.is_pickup ? <Store size={14} /> : <Truck size={14} />}
          </button>
        )}

        {(order.status === "Dikirim" || order.status === "Dapat Diambil") && (
          <button onClick={() => handleUpdateStatus(order.id, "Selesai")} className={`${btnClass} bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white`}>
            <CheckCircle2 size={14} />
          </button>
        )}

        {order.status === "Dibatalkan" && (
          <button onClick={() => handleUpdateStatus(order.id, "Menunggu")} className={`${btnClass} bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-200`}>
            <RotateCcw size={14} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: isScrolled ? "90px" : "400px" }}>
          <div className="px-8 pt-8 flex justify-between items-center">
            <div className={`transition-all duration-500 ${isScrolled ? "opacity-0 -translate-y-10" : "opacity-100"}`}>
              <h1 className="text-xl font-black uppercase tracking-tight">Kelola Pesanan</h1>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Monitoring Transaksi UD BAROKAH</p>
            </div>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-8 py-6 transition-all duration-500 ${isScrolled ? "opacity-0 scale-95 pointer-events-none -mb-28" : "opacity-100 mb-0"}`}>
            <InventoryStatCard label="Total" value={stats.total} icon={<ShoppingCart size={14}/>} iconBg="bg-slate-100 text-slate-600" />
            <InventoryStatCard label="Menunggu" value={stats.pending} icon={<Clock size={14}/>} iconBg="bg-amber-50 text-amber-600" />
            <InventoryStatCard label="Disiapkan" value={stats.processing} icon={<Package size={14}/>} iconBg="bg-blue-50 text-blue-600" />
            <InventoryStatCard label="Siap Ambil" value={stats.ready} icon={<Store size={14}/>} iconBg="bg-orange-50 text-orange-600" />
            <InventoryStatCard label="Dikirim" value={stats.shipping} icon={<Truck size={14}/>} iconBg="bg-purple-50 text-purple-600" />
            <InventoryStatCard label="Selesai" value={stats.finished} icon={<CheckCircle2 size={14}/>} iconBg="bg-emerald-50 text-emerald-600" />
          </div>
          <div className={`px-8 py-2 flex gap-4 items-center transition-all duration-500 ${isScrolled ? "-translate-y-12" : ""}`}>
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1a4d2e]" size={14} />
              <input type="text" placeholder="Cari Pesanan..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-white border border-slate-100 rounded-xl py-3.5 pl-11 pr-4 text-[11px] font-bold shadow-sm focus:outline-none focus:border-emerald-500/20" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
              {TABS.map(t => (
                <button key={t} onClick={() => { setActiveTab(t); setPage(1); }}
                  className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${activeTab === t ? "bg-[#1a4d2e] text-white border-[#1a4d2e] shadow-lg" : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </header>
        <main className="flex-1 px-8 pb-8 flex flex-col min-h-0 mt-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto custom-scrollbar" ref={tableScrollRef}>
              <table className="w-full">
                <thead className="bg-slate-50/50 sticky top-0 backdrop-blur-md z-10 border-b border-slate-100">
                  <tr>
                    {["ID", "Pelanggan", "Tanggal", "Total Bayar", "Status", "Aksi"].map(h => (
                      <th key={h} className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr><td colSpan={6} className="py-24 text-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2"/><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Memuat Data...</p></td></tr>
                  ) : (
                    <>
                      {paginatedItems.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/50 transition-colors h-[68px]">
                          <td className="px-8 py-5"><span className="text-[10px] font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">#{o.id}</span></td>
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold uppercase truncate tracking-tight">{o.customer_name}</span>
                              <span className="text-[9px] text-slate-400 font-bold uppercase">ID: {String(o.user_id).slice(-6)}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase">{o.created_at}</td>
                          <td className="px-8 py-5 text-xs font-black text-slate-900">{formatRupiah(o.total_price)}</td>
                          <td className="px-8 py-5">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider ${STATUS_CONFIG[o.status]?.bg} ${STATUS_CONFIG[o.status]?.text} ${STATUS_CONFIG[o.status]?.border}`}>
                              {STATUS_CONFIG[o.status]?.icon} {o.status}
                            </div>
                          </td>
                          <td className="px-8 py-5"><ActionButtons order={o} /></td>
                        </tr>
                      ))}
                      {paginatedItems.length < PER_PAGE && <tr style={{ height: `${(PER_PAGE - paginatedItems.length) * 68}px` }}><td colSpan={6} /></tr>}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <footer className="px-8 py-4 border-t border-slate-50 flex items-center justify-between bg-white">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Page {page} of {totalPages}</p>
              <div className="flex gap-1.5">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-20"><ChevronLeft size={16} /></button>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-20"><ChevronRight size={16} /></button>
              </div>
            </footer>
          </div>
        </main>
      </div>
      {isModalOpen && <OrderDetailModal order={selectedOrder} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AdminOrders;