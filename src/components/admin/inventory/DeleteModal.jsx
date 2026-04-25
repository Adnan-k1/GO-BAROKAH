import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

/**
 * DeleteModal
 * Konfirmasi hapus produk.
 *
 * @param {object}   product  - { name }
 * @param {function} onClose
 * @param {function} onConfirm - () => Promise<{success, message}>
 */
const DeleteModal = ({ product, onClose, onConfirm }) => {
  const [saving, setSaving] = useState(false);

  const handleConfirm = async () => {
    setSaving(true);
    await onConfirm();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-7 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">Hapus Produk?</h3>
        <p className="text-sm text-slate-400 mb-6">
          Produk <span className="font-semibold text-slate-600">"{product?.name}"</span> akan dihapus permanen dan tidak bisa dikembalikan.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={saving}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {saving ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;