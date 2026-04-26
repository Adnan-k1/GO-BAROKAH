import React, { useState, useEffect } from "react";
import { X, ImageIcon, Tag, Archive, Package } from "lucide-react";

const CATEGORIES = ["Minuman", "Makanan", "Snack", "Bumbu"];
const UNITS = ["Pcs", "Bks", "Dus", "Kg", "Ltr", "Botol", "Karung"];

const INITIAL_FORM = {
  name: "", description: "", category: "Minuman",
  unit: "Pcs", image_url: "", stock: 0, price: 0, discount_amount: 0,
};

const ProductModal = ({ mode, initial = null, onClose, onSubmit }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initial) {
      setForm({ ...initial });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [mode, initial]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all font-medium";
  const labelClass = "text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block px-1";

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {mode === "create" ? "Tambah Produk" : "Edit Produk"}
            </h2>
            <p className="text-xs text-slate-400">Pastikan data yang diinput sudah benar.</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelClass}>Nama Produk</label>
              <input required name="name" type="text" value={form.name} onChange={handleChange} className={inputClass} placeholder="Contoh: Indomie Goreng" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Deskripsi Singkat</label>
              <textarea required name="description" rows={2} value={form.description} onChange={handleChange} className={inputClass} placeholder="Detail berat, rasa, atau merk..." />
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Satuan</label>
              <select name="unit" value={form.unit} onChange={handleChange} className={inputClass}>
                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Link Gambar (Opsional)</label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="image_url" type="text" value={form.image_url} onChange={handleChange} className={`${inputClass} pl-11`} placeholder="https://image-link.com/..." />
              </div>
            </div>
            <div>
              <label className={labelClass}>Stok Barang</label>
              <input required name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Harga Jual (Rp)</label>
              <input required name="price" type="number" min="0" value={form.price} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>
        <div className="px-8 py-6 bg-slate-50 flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 py-3.5 rounded-xl text-sm font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
            Batalkan
          </button>
          <button type="submit" disabled={isSaving} className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1a4d2e] hover:bg-emerald-900 shadow-lg shadow-emerald-900/20 disabled:opacity-50 transition-all">
            {isSaving ? "Memproses..." : mode === "create" ? "Simpan Produk" : "Perbarui Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModal;