import React from "react";
import { Plus, Menu, AlertCircle, Package } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import InventoryStatCard from "../../components/admin/inventory/InventoryStatCard";
import ProductFilterBar from "../../components/admin/inventory/ProductFilterBar";
import ProductTable from "../../components/admin/inventory/ProductTable";
import ProductModal from "../../components/admin/inventory/ProductModal";
import ConfirmModal from "../../components/forms/ConfirmModal";
import { useAdminInventoryLogic } from "../../hooks/admin/useAdminInventoryLogic";

const AdminInventory = () => {
  const {
    categories,
    types,
    isLoading,
    actionLoading,
    search,
    activeCat,
    isMobileOpen,
    page,
    modalMode,
    selected,
    isScrolled,
    deleteModal,
    tableScrollRef,
    stats,
    paginatedItems,
    totalPages,
    setPage,
    openModal,
    handleDeleteConfirm,
    handleSearchChange,
    handleCatChange,
    handleCreate,
    handleUpdate,
    handleToggleActive,
    handleAddCategory,
    handleAddType,
    handleEditCategory,
    handleEditType,
    setModalMode,
    setDeleteModal,
    setIsMobileOpen,
  } = useAdminInventoryLogic();

  const statCards = [
    {
      label: "Perlu Restock",
      value: stats.needRestockProducts.length,
      icon: <AlertCircle size={16} />,
      iconBg: "bg-red-50 text-red-600",
      items: stats.needRestockProducts,
    },
    {
      label: "Stok Tersedia",
      value: stats.availableProducts.length,
      icon: <Package size={16} />,
      iconBg: "bg-emerald-50 text-emerald-600",
      items: stats.availableProducts,
    },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <AdminSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-[#F8FAFC] relative z-50">
          <div className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-8 relative z-20 bg-[#F8FAFC]">
            <div className="flex items-center gap-3 md:gap-0">
              <button className="md:hidden p-2 -ml-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#1a4d2e] relative z-50" onClick={() => setIsMobileOpen(true)}>
                <Menu size={20} />
              </button>
              <div className="transition-all duration-500">
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase">Inventaris</h1>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-[0.2em] hidden md:block">Sistem Inventaris UD BAROKAH</p>
              </div>
            </div>
            <button onClick={() => openModal("create")} className="flex items-center gap-2 bg-[#1a4d2e] text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all">
              <Plus size={14} strokeWidth={3} />
              <span className={isScrolled ? "hidden md:block" : "block"}>Produk Baru</span>
            </button>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${isScrolled ? 'overflow-hidden' : 'overflow-visible relative z-40'}`}
            style={{ maxHeight: isScrolled ? "0px" : "500px", opacity: isScrolled ? 0 : 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-4 md:px-8 py-4 md:py-6">
              {statCards.map((s) => <InventoryStatCard key={s.label} {...s} />)}
            </div>
          </div>

          <div className="relative z-20 px-4 md:px-8 py-2 bg-[#F8FAFC]">
            <ProductFilterBar
              search={search}
              onSearchChange={handleSearchChange}
              activecat={activeCat}
              onCatChange={handleCatChange}
              categories={categories}
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 px-4 md:px-8 pb-4 md:pb-8 flex flex-col min-h-0 mt-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden">
            <ProductTable
              products={paginatedItems}
              isLoading={isLoading}
              tableScrollRef={tableScrollRef}
              onToggleActive={handleToggleActive}
              onEdit={(p) => openModal("edit", p)}
              onDelete={(p) => setDeleteModal({ isOpen: true, id: p.id })}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      {(modalMode === "create" || modalMode === "edit") && (
        <ProductModal
          mode={modalMode}
          initial={selected}
          categories={categories}
          types={types}
          onClose={() => setModalMode(null)}
          onAddCategory={handleAddCategory}
          onAddType={handleAddType}
          onEditCategory={handleEditCategory}
          onEditType={handleEditType}
          onSubmit={modalMode === "create" ? handleCreate : (data) => handleUpdate(selected?.id, data)}
        />
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Hapus Produk"
        message="Apakah kamu yakin ingin menghapus produk ini? Semua data terkait produk ini akan ikut terhapus secara permanen."
        isLoading={actionLoading}
      />
    </div>
  );
};

export default AdminInventory;
