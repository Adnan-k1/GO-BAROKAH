import React, { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Pencil, Trash2, Package, Database } from "lucide-react";

import AdminSidebar        from "../../components/admin/AdminSidebar";
import InventoryStatCard   from "../../components/admin/inventory/InventoryStatCard";
import ProductFilterBar    from "../../components/admin/inventory/ProductFilterBar";
import ProductModal        from "../../components/admin/inventory/ProductModal";
import DeleteModal         from "../../components/admin/inventory/DeleteModal";
import { useAdminProducts } from "../../hooks/admin/useAdminProducts";

// ─── Helper ──────────────────────────────────────────────────────
const formatRp  = (v) => `Rp ${Number(v || 0).toLocaleString("id-ID")}`;
const PER_PAGE  = 5;

// ─── Loading skeleton ─────────────────────────────────────────────
const LoadingState = () => (
  <div className="flex h-screen bg-[#F8FAFC] items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-400 font-medium animate-pulse">Memuat produk...</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────
const AdminInventory = () => {
  const {
    products, isLoading, error,
    handleCreate, handleUpdate, handleDelete,
  } = useAdminProducts();

  // ── UI state ────────────────────────────────────────────────────
  const [search,    setSearch]    = useState("");
  const [activecat, setActivecat] = useState("Semua");
  const [page,      setPage]      = useState(1);
  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | "delete"
  const [selected,  setSelected]  = useState(null);

  const currentUser = { name: "Adnan Gian", role: "Administrator" };

  // ── Handlers ────────────────────────────────────────────────────
  const openCreate = ()      => { setSelected(null); setModalMode("create"); };
  const openEdit   = (prod)  => { setSelected(prod); setModalMode("edit");   };
  const openDelete = (prod)  => { setSelected(prod); setModalMode("delete"); };
  const closeModal = ()      => setModalMode(null);

  const onSubmitCreate = async (payload) => {
    const res = await handleCreate(payload);
    if (res.success) closeModal();
    return res;
  };

  const onSubmitEdit = async (payload) => {
    const res = await handleUpdate(selected?._id ?? selected?.id, payload);
    if (res.success) closeModal();
    return res;
  };

  const onConfirmDelete = async () => {
    const res = await handleDelete(selected?._id ?? selected?.id);
    if (res.success) closeModal();
  };

  // ── Filter & pagination ─────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchCat    = activecat === "Semua" || p.category === activecat;
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalStock = products.reduce((s, p) => s + Number(p.stock ?? 0), 0);

  // ── Render ──────────────────────────────────────────────────────
  if (isLoading) return <LoadingState />;
  if (error)     return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-red-500 font-medium">{error}</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      <AdminSidebar user={currentUser} />

      <main className="flex-1 flex flex-col overflow-hidden px-8 py-8 gap-6">

        {/* Title + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory Barang</h1>
            <p className="text-sm text-slate-400 mt-0.5">Kelola semua produk UD BAROKAH</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#1a4d2e] hover:bg-[#14532D] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md shadow-emerald-900/20 transition-colors"
          >
            <Plus size={16} /> Tambah Produk
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-5">
          <InventoryStatCard
            label="Total Jenis Produk"
            value={products.length}
            icon={<Package size={22} />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <InventoryStatCard
            label="Total Stok"
            value={totalStock.toLocaleString("id-ID")}
            icon={<Database size={22} />}
            iconBg="bg-blue-50 text-blue-600"
          />
        </div>

        {/* Filter */}
        <ProductFilterBar
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          activecat={activecat}
          onCatChange={(v) => { setActivecat(v); setPage(1); }}
        />

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-100">
                <tr>
                  {["Nama Produk", "Kategori", "Stok", "Harga", "Aksi"].map((h) => (
                    <th key={h} className={`px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider ${h === "Aksi" ? "text-right" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((p) => (
                  <tr key={p._id ?? p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{p.name}</p>
                      {p.description && (
                        <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs truncate">{p.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{p.stock} {p.unit}</td>
                    <td className="px-6 py-4 font-bold text-emerald-700">{formatRp(p.price)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all"
                          aria-label="Edit produk"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => openDelete(p)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                          aria-label="Hapus produk"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 flex-shrink-0">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} /> Previous
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all
                    ${page === n ? "bg-[#1a4d2e] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      {(modalMode === "create" || modalMode === "edit") && (
        <ProductModal
          mode={modalMode}
          initial={selected}
          onClose={closeModal}
          onSubmit={modalMode === "create" ? onSubmitCreate : onSubmitEdit}
        />
      )}

      {modalMode === "delete" && (
        <DeleteModal
          product={selected}
          onClose={closeModal}
          onConfirm={onConfirmDelete}
        />
      )}
    </div>
  );
};

export default AdminInventory;
