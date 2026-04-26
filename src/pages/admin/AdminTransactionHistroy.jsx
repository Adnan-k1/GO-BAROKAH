import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Search, Loader2, Wallet, Clock, 
  CheckCircle2, XCircle, CreditCard, Calendar, Store, Truck, Package
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import InventoryStatCard from "../../components/admin/inventory/InventoryStatCard";
import { useAdminOrders } from "../../hooks/admin/useAdminOrders";
import { formatRupiah } from "../../utils/formatters";

const PER_PAGE = 10;
const TABS = ["Semua", "Menunggu", "Disiapkan", "Diambil", "Batal"];
const STATUS_MAP = {
  "Menunggu": "Menunggu",
  "Disiapkan": "Disiapkan",
  "Dikirim": "Menunggu",
  "Dapat Diambil": "Disiapkan",
  "Selesai": "Diambil",
  "Dibatalkan": "Batal"
};

const STATUS_CONFIG = {
  "Selesai": { bg: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <CheckCircle2 size={10} /> },
  "Menunggu": { bg: "bg-amber-50 text-amber-600 border-amber-100", icon: <Clock size={10} /> },
  "Disiapkan": { bg: "bg-blue-50 text-blue-600 border-blue-100", icon: <Package size={10} /> },
  "Dapat Diambil": { bg: "bg-orange-50 text-orange-600 border-orange-100", icon: <Store size={10} /> },
  "Dikirim": { bg: "bg-purple-50 text-purple-600 border-purple-100", icon: <Truck size={10} /> },
  "Dibatalkan": { bg: "bg-red-50 text-red-600 border-red-100", icon: <XCircle size={10} /> },
};

const AdminTransactionHistory = () => {
  const { orders, isLoading } = useAdminOrders();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");
  const [page, setPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const tableScrollRef = useRef(null);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const onScroll = () => setIsScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const filteredData = useMemo(() => {
    return orders.filter((o) => {
      const currentStatus = STATUS_MAP[o.status] || "Menunggu";
      const matchTab = activeTab === "Semua" || currentStatus === activeTab;
      const matchSearch = o.customer_name?.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search);
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, search]);

  const stats = useMemo(() => ({
    totalAmount: orders.filter(o => o.status === "Selesai").reduce((acc, curr) => acc + curr.total_price, 0),
    totalCount: orders.length,
    pending: orders.filter(o => o.status === "Menunggu").length,
  }), [orders]);

  const totalPages = Math.ceil(filteredData.length / PER_PAGE) || 1;
  const paginatedItems = filteredData.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header 
          className="flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden" 
          style={{ maxHeight: isScrolled ? "90px" : "400px" }}
        >
          <div className="px-8 pt-8 flex items-center justify-between">
            <div className={`transition-all duration-500 ${isScrolled ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}`}>
              <h1 className="text-xl font-black tracking-tight uppercase">Riwayat Transaksi</h1>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-[0.2em]">Monitoring Arus Kas UD BAROKAH</p>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 px-8 py-6 transition-all duration-500 origin-top ${isScrolled ? "opacity-0 scale-95 pointer-events-none -mb-[120px]" : "opacity-100 scale-100 mb-0"}`}>
            <InventoryStatCard label="Total Pendapatan" value={formatRupiah(stats.totalAmount)} subValue="Selesai" icon={<Wallet size={14} />} iconBg="bg-emerald-50 text-emerald-600" />
            <InventoryStatCard label="Total Transaksi" value={stats.totalCount} subValue="Semua Status" icon={<Calendar size={14} />} iconBg="bg-slate-100 text-slate-600" />
            <InventoryStatCard label="Perlu Diproses" value={stats.pending} subValue="Menunggu" icon={<Clock size={14} />} iconBg="bg-amber-50 text-amber-600" />
          </div>

          <div className={`px-8 py-2 flex gap-4 items-center transition-all duration-500 ${isScrolled ? "-translate-y-12" : "translate-y-0"}`}>
            <SearchInput value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
              {TABS.map(t => (
                <TabButton key={t} label={t} active={activeTab === t} onClick={() => { setActiveTab(t); setPage(1); }} />
              ))}
            </div>
          </div>
        </header>
        <main className="flex-1 px-8 pb-8 flex flex-col min-h-0 mt-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto custom-scrollbar" ref={tableScrollRef}>
              <table className="w-full border-collapse">
                <thead className="bg-slate-50/50 sticky top-0 backdrop-blur-md z-10 border-b border-slate-100">
                  <tr>
                    {["ID", "Pelanggan", "Pengambilan", "Pembayaran", "Total", "Status"].map((h) => (
                      <th key={h} className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? <LoadingState /> : (
                    <>
                      {paginatedItems.map((o) => <TableRow key={o.id} order={o} />)}
                      {paginatedItems.length < PER_PAGE && <tr style={{ height: `${(PER_PAGE - paginatedItems.length) * 68}px` }}><td colSpan={6} /></tr>}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); tableScrollRef.current.scrollTop = 0; }} />
          </div>
        </main>
      </div>
    </div>
  );
};

const SearchInput = ({ value, onChange }) => (
  <div className="relative flex-1 group">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1a4d2e] transition-colors" size={14} />
    <input 
      type="text" 
      placeholder="Cari transaksi..." 
      className="w-full bg-white border border-slate-100 rounded-xl py-3.5 pl-11 pr-4 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/20 transition-all shadow-sm" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${active ? "bg-[#1a4d2e] text-white border-[#1a4d2e] shadow-lg" : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"}`}
  >
    {label}
  </button>
);

const LoadingState = () => (
  <tr>
    <td colSpan={6} className="py-24 text-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Memuat...</p>
    </td>
  </tr>
);

const TableRow = ({ order }) => {
  const config = STATUS_CONFIG[order.status];
  return (
    <tr className="hover:bg-slate-50/50 transition-colors h-[68px]">
      <td className="px-8 py-5"><span className="text-[10px] font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">#{order.id}</span></td>
      <td className="px-8 py-5 text-xs font-bold uppercase text-slate-700">{order.customer_name}</td>
      <td className="px-8 py-5">
        <div className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2 py-1 rounded-lg border uppercase ${order.is_pickup ? "text-orange-600 bg-orange-50 border-orange-100" : "text-blue-600 bg-blue-50 border-blue-100"}`}>
          {order.is_pickup ? <><Store size={12} /> Ambil</> : <><Truck size={12} /> Kirim</>}
        </div>
      </td>
      <td className="px-8 py-5 text-[10px] font-bold text-slate-500">
        <div className="flex items-center gap-2"><CreditCard size={12} /> {order.payment_method || "Transfer Bank"}</div>
      </td>
      <td className="px-8 py-5 text-xs font-black text-slate-900">{formatRupiah(order.total_price)}</td>
      <td className="px-8 py-5">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider ${config?.bg} ${config?.text} ${config?.border}`}>
          {config?.icon} {order.status}
        </div>
      </td>
    </tr>
  );
};

const Pagination = ({ page, totalPages, onPageChange }) => (
  <footer className="px-8 py-4 border-t border-slate-50 flex items-center justify-between bg-white flex-shrink-0">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Page {page} of {totalPages}</p>
    <div className="flex gap-1.5">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm active:scale-95"><ChevronLeft size={16} /></button>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm active:scale-95"><ChevronRight size={16} /></button>
    </div>
  </footer>
);

export default AdminTransactionHistory;