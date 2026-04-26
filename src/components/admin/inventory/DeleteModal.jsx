import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const DeleteModal = ({ product, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-all"
      onClick={onClose} 
    >
      <div 
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-7 text-center scale-up-animation"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Produk?</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Tindakan ini akan menghapus <span className="font-bold text-slate-800">"{product?.name}"</span> secara permanen dari sistem UD. Barokah.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 shadow-lg shadow-red-200 transition-all"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;