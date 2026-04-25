import React, { useState, useEffect } from "react";
import { X, Image as ImageIcon, Tag } from "lucide-react";

const CATEGORIES = ["Minuman", "Makanan", "Snack", "Bumbu"];
const UNITS      = ["Pcs", "Bks", "Dus", "Kg", "Ltr", "Botol", "Karung"];

const INITIAL_FORM = {
  name: "", description: "", category: "Minuman",
  unit: "Pcs", image_url: "", stock: 0, price: 0, discount_amount: 0,
};

/**
 * ProductModal
 * Dipakai untuk mode "create" dan "edit".
 *
 * @param {"create"|"edit"} mode
 * @param {object|null}     initial  - data produk (hanya untuk mode edit)
 * @param {function}        onClose
 * @param {function}        onSubmit - (payload) => Promise<{success, message}>
 */
const ProductModal = ({ mode, initial = null, onClose, onSubmit }) => {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);

  // Isi form saat edit
  useEffect(() => {
    if (mode === "edit" && initial) {
      setForm({
        name:            initial.name            ?? "",
        description:     initial.description     ?? "",
        category:        initial.category        ?? "Minuman",
        unit:            initial.unit            ?? "Pcs",
        image_url:       initial.image_url       ?? "",
        stock:           initial.stock           ?? 0,
        price:           initial.price           ?? 0,
        discount_amount: initial.discount_amount ?? 0,
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [mode, initial]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price:           Number(form.price),
      stock:           Number(form.stock),
      discount_amount: Number(form.discount_amount),
    };
    const res = await onSubmit(payload);
    setSaving(false);
    if (!res.success) alert(res.message);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-10 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl my-auto overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {mode === "create" ? "Tambah Produk Baru" : "Edit Produk"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Nama */}
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Nama Produk</label>
            <input
              required type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Deskripsi</label>
            <textarea
              required rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Jelaskan detail produk..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Kategori + Satuan */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Satuan</label>
              <select
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              >
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* URL Gambar */}
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
              <ImageIcon size={13} /> URL Gambar
            </label>
            <input
              type="text"
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
            />
          </div>

          {/* Stok + Harga + Diskon */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Stok</label>
              <input
                required type="number" min={0}
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Harga</label>
              <input
                required type="number" min={0}
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                <Tag size={12} /> Diskon
              </label>
              <input
                type="number" min={0}
                value={form.discount_amount}
                onChange={(e) => set("discount_amount", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-slate-100 flex gap-3">
          <button
            type="button" onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit" disabled={saving}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-[#1a4d2e] hover:bg-[#14532D] disabled:opacity-50 transition-colors"
          >
            {saving ? "Menyimpan..." : mode === "create" ? "Tambah Produk" : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModal;
