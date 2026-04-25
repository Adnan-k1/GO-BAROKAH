import React from "react";
import { ArrowRight, AlertTriangle, Search, Bell } from "lucide-react";
import { useAdminDashboard } from "../../hooks/admin/useAdminDashboard";
import { STAT_CONFIG } from "../../constants/adminConstants";
import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";
import OrderRow from "../../components/admin/OrderRow";
import StockAlertItem from "../../components/admin/StockAlertItem";

/* ─── Loading skeleton ───────────────────────────────────────── */
const LoadingSkeleton = () => (
  <div className="flex h-screen bg-[#F8FAFC] items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-400 font-medium animate-pulse">Memuat data...</p>
    </div>
  </div>
);

/* ─── Error state ────────────────────────────────────────────── */
const ErrorState = ({ message }) => (
  <div className="flex h-screen bg-[#F8FAFC] items-center justify-center">
    <div className="text-center">
      <p className="text-slate-800 font-semibold mb-1">Gagal memuat dashboard</p>
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────── */
const AdminDashboard = () => {
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) return <LoadingSkeleton />;
  if (error)     return <ErrorState message={error} />;
  if (!data)     return null;

  const currentUser = { name: "Adnan Gian", role: "Head Admin" };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">

      {/* ── SIDEBAR ─────────────────────────────────────────────── */}
      <AdminSidebar
        user={currentUser}
        alertCount={data.lowStock.length}
      />

      {/* ── MAIN ────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="h-[72px] bg-white border-b border-slate-100 px-8 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
              Ringkasan Performa
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Selamat datang kembali, {currentUser.name.split(" ")[0]}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <label className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Cari data..."
                className="
                  pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200
                  rounded-xl w-56 focus:bg-white focus:outline-none
                  focus:ring-2 focus:ring-emerald-300/60 transition-all
                  placeholder:text-slate-300
                "
              />
            </label>

            {/* Notification bell */}
            <button
              aria-label="Notifikasi"
              className="relative w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <Bell size={17} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* ── Scrollable body ──────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-7 space-y-7">

          {/* STAT CARDS */}
          <section aria-label="Statistik Ringkasan">
            <div className="grid grid-cols-4 gap-5">
              {STAT_CONFIG.map((config) => (
                <StatCard
                  key={config.key}
                  config={config}
                  statData={data.stats[config.key]}
                />
              ))}
            </div>
          </section>

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-3 gap-6">

            {/* ── Recent Orders ── */}
            <section
              aria-label="Transaksi Terakhir"
              className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Transaksi Terakhir</h3>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-lg transition-colors">
                  Lihat Semua <ArrowRight size={12} />
                </button>
              </div>

              {/* Order list */}
              <div className="px-2 py-3 space-y-0.5">
                {data.orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </div>
            </section>

            {/* ── Stock Alerts ── */}
            <section
              aria-label="Stok Menipis"
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={14} className="text-red-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Stok Menipis</h3>
                <span className="ml-auto text-xs bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-full border border-red-100">
                  {data.lowStock.length}
                </span>
              </div>

              {/* Stock list */}
              <div className="p-4 space-y-3">
                {data.lowStock.map((item) => (
                  <StockAlertItem key={item.id} item={item} />
                ))}
              </div>

              {/* CTA */}
              <div className="px-4 pb-4">
                <button className="w-full py-3 bg-[#166534] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold tracking-wide shadow-sm shadow-emerald-200 transition-colors uppercase">
                  Kelola Inventaris
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
