import React from "react";
import { LogOut } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-5">
            <LogOut size={32} strokeWidth={2.5} />
          </div>
          
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
            Konfirmasi Keluar
          </h3>
          <p className="text-xs font-bold text-slate-400 mt-2 leading-relaxed">
            Apakah kamu yakin ingin keluar dari dashboard <span className="text-emerald-700">UD BAROKAH</span>?
          </p>
          
          <div className="flex gap-3 w-full mt-8">
            <button 
              onClick={onClose}
              className="flex-1 py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 px-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 transition-all active:scale-95"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;