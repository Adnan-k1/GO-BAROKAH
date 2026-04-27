import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../common/Button';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Ya, Hapus",
  variant = "danger",
  isLoading = false 
}) => {
  const [animate, setAnimate] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          animate ? "opacity-100" : "opacity-0"
        }`} 
        onClick={isLoading ? null : onClose} 
      />
      <div 
        className={`relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
          animate 
            ? "scale-100 translate-y-0 opacity-100" 
            : "scale-50 translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 bg-red-50 rounded-2xl text-red-500 transition-transform duration-500 delay-150 ${animate ? 'scale-100 rotate-0' : 'scale-0 -rotate-45'}`}>
            <AlertTriangle size={24} strokeWidth={2.5}/>
          </div>
          <button 
            onClick={onClose} 
            disabled={isLoading}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group disabled:opacity-30"
          >
            <X size={20} className="text-gray-400 group-hover:text-gray-700 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        <div className="space-y-1.5 text-left">
          <h3 className={`text-xl font-black text-gray-950 uppercase tracking-tight transition-all duration-500 delay-75 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
            {message}
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-[11px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all border border-gray-100 active:scale-95 disabled:opacity-50"
          >
            Batal
          </button>
          <Button 
            variant={variant} 
            onClick={onConfirm}
            isLoading={isLoading} 
            className="flex-1 py-3.5 px-6 shadow-lg shadow-red-900/15 rounded-2xl text-[11px] font-black uppercase tracking-widest active:scale-95"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;