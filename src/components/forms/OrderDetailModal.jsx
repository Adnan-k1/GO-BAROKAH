import { X, Package, CreditCard, Calendar, ShoppingCart } from 'lucide-react';
import Button from '../common/Button';

const OrderDetailModal = ({ order, isOpen, onClose, formatCurrency }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-[28px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-[#F8FAF9]">
          <div className="flex items-center gap-3">
            <div className="bg-[#3A5A4D] p-2 rounded-lg text-white">
              <ShoppingCart size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-none">Rincian Pesanan</h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">{order.invoice_no}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Tanggal</span>
              </div>
              <p className="text-xs font-bold text-gray-900">
                {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <CreditCard size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Pembayaran</span>
              </div>
              <p className="text-xs font-bold text-gray-900">{order.payment_method}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-400 mb-2 px-1">
              <Package size={12} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Item Produk</span>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 rounded-xl bg-white border border-gray-50 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">{item.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{formatCurrency(item.price)} x {item.qty}</span>
                  </div>
                  <span className="text-xs font-black text-[#3A5A4D]">{formatCurrency(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Bayar</span>
              <span className="text-xl font-black text-[#3A5A4D]">{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
          <Button variant="ghost" className="px-5 py-2.5 text-[11px]" onClick={onClose}>
            Tutup
          </Button>
          <Button variant="primary" className="px-6 py-2.5 text-[11px]" onClick={() => window.print()}>
            Cetak Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;