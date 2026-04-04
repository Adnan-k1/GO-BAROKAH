import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../common/Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-red-50 rounded-2xl text-red-500">
            <AlertTriangle size={24} />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {message}
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-colors border border-gray-100"
          >
            Batal
          </button>
          <Button 
            variant="danger" 
            onClick={onConfirm}
            className="flex-1 py-3 px-6 shadow-lg shadow-red-900/10"
          >
            Ya, Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;