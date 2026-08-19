import React from "react";
import { Menu, ShoppingCart, Clock, Package, CheckCircle2, Truck, Store } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import InventoryStatCard from "../../components/admin/inventory/InventoryStatCard";
import OrdersTable from "../../components/admin/order/OrdersTable";
import OrderFilterBar from "../../components/admin/order/OrderFilterBar";
import OrderDetailModal from "../../components/admin/order/OrderDetailModal";
import ConfirmModal from "../../components/forms/ConfirmModal";
import { useAdminOrdersLogic, TABS } from "../../hooks/admin/useAdminOrdersLogic";

const AdminOrders = () => {
  const {
    isLoading,
    search,
    activeTab,
    page,
    isScrolled,
    selectedOrder,
    isModalOpen,
    confirmAction,
    isMobileOpen,
    tableScrollRef,
    paginatedItems,
    totalPages,
    stats,
    modalContent,
    setPage,
    openDetail,
    handleSearchChange,
    handleTabChange,
    handleConfirm,
    setConfirmAction,
    setIsModalOpen,
    setIsMobileOpen,
  } = useAdminOrdersLogic();

  const STAT_CARDS = [
    { label: "Total", value: stats.total, icon: <ShoppingCart size={14} />, iconBg: "bg-slate-100 text-slate-600" },
    { label: "Menunggu", value: stats.pending, icon: <Clock size={14} />, iconBg: "bg-amber-50 text-amber-600" },
    { label: "Disiapkan", value: stats.processing, icon: <Package size={14} />, iconBg: "bg-blue-50 text-blue-600" },
    { label: "Siap Ambil", value: stats.ready, icon: <Store size={14} />, iconBg: "bg-orange-50 text-orange-600" },
    { label: "Dikirim", value: stats.shipping, icon: <Truck size={14} />, iconBg: "bg-purple-50 text-purple-600" },
    { label: "Selesai", value: stats.finished, icon: <CheckCircle2 size={14} />, iconBg: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <AdminSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-[#F8FAFC] relative z-50">
          <div className="px-4 md:px-8 pt-4 md:pt-8 flex justify-between items-center gap-4 bg-[#F8FAFC] relative z-20">
            <div className="flex items-center gap-3 md:gap-0">
              <button className="md:hidden p-2 -ml-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#1a4d2e] relative z-50" onClick={() => setIsMobileOpen(true)}>
                <Menu size={20} />
              </button>
              <div className="transition-all duration-500">
                <h1 className="text-lg md:text-xl font-black uppercase tracking-tight">
                  Kelola Pesanan
                </h1>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-widest hidden md:block">
                  Monitoring Pesanan UD BAROKAH
                </p>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${isScrolled ? 'overflow-hidden' : 'overflow-visible relative z-40'}`}
            style={{ maxHeight: isScrolled ? "0px" : "500px", opacity: isScrolled ? 0 : 1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-4 md:px-8 py-4 md:py-6">
              {STAT_CARDS.map((card) => (
                <InventoryStatCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  icon={card.icon}
                  iconBg={card.iconBg}
                />
              ))}
            </div>
          </div>

          <div className="px-4 md:px-8 py-2 bg-[#F8FAFC] relative z-20">
            <OrderFilterBar
              search={search}
              onSearchChange={handleSearchChange}
              activeStatus={activeTab}
              onStatusChange={handleTabChange}
              statuses={TABS}
            />
          </div>
        </div>

        <main className="flex-1 px-4 md:px-8 pb-4 md:pb-8 flex flex-col min-h-0 mt-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden">
            <OrdersTable
              orders={paginatedItems}
              isLoading={isLoading}
              tableScrollRef={tableScrollRef}
              onOpenDetail={openDetail}
              onConfirm={(order, status) => setConfirmAction({ order, status })}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </main>
      </div>

      <OrderDetailModal
        isOpen={isModalOpen}
        order={selectedOrder}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.btnText}
        variant={modalContent.variant}
      />
    </div>
  );
};

export default AdminOrders;
