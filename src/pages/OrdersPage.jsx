import React from 'react';
import { ClipboardList, Eye, ShoppingBag } from 'lucide-react';
import { useOrderLogic } from '../hooks/useOrderLogic';


const EmptyOrders = ({ onStartShopping }) => (
  <div className="flex flex-col items-center justify-center text-center py-24 bg-[#FBFBFB] rounded-[32px] border-2 border-dashed border-gray-100">
    <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-gray-50">
      <ShoppingBag size={48} className="text-gray-200" />
    </div>
    <h4 className="text-lg font-bold text-gray-800">Belum Ada Pesanan</h4>
    <p className="text-sm text-gray-400 max-w-xs mt-2 mb-8">
      Sepertinya kamu belum pernah berbelanja. Yuk, mulai belanja sekarang!
    </p>
    <button 
      onClick={onStartShopping}
      className="px-10 py-3.5 bg-[#2D5A43] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#234735] transition-all shadow-lg shadow-[#2d5a43]/20"
    >
      Mulai Belanja
    </button>
  </div>
);

const OrderCard = ({ order, onDetail, formatCurrency }) => (
  <div className="bg-white border border-gray-100 rounded-[28px] overflow-hidden hover:shadow-md transition-all duration-300">
    <div className="px-6 py-5 flex justify-between items-center bg-[#FCFCFD] border-b border-gray-50">
      <div className="flex items-center gap-4">
        <div className="bg-[#4B5E53] p-3 rounded-xl text-white">
          <ClipboardList size={20} />
        </div>
        <div>
          <p className="font-extrabold text-sm text-gray-900 leading-none">{order.id}</p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">{order.date}</p>
        </div>
      </div>
      <span className="bg-[#D1E2D9] text-[#2D5A43] text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-wider">
        {order.status}
      </span>
    </div>

    <div className="px-6 py-6 space-y-4">
      {order.items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">{item.name}</span>
          <span className="font-bold text-gray-900">{formatCurrency(item.price)}</span>
        </div>
      ))}
    </div>

    <div className="px-6 py-5 bg-[#FCFCFD] border-t border-gray-50 flex justify-between items-center">
      <div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mb-1">Total Belanja</p>
        <p className="text-lg font-black text-[#2D5A43]">{formatCurrency(order.total)}</p>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => onDetail(order.id)}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-100 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:border-[#4B5E53] transition-colors"
        >
          <Eye size={14} /> Detail
        </button>
        <button className="px-6 py-2.5 bg-[#4B5E53] text-white rounded-xl text-[10px] font-black uppercase hover:bg-[#3d4d44]">
          Beli lagi
        </button>
      </div>
    </div>
  </div>
);

const OrdersPage = () => {
  const { 
    orders, activeTab, setActiveTab, statuses, 
    formatCurrency, handleStartShopping, handleViewDetail 
  } = useOrderLogic();

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm min-h-[550px]">
      <header className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Riwayat Pesanan</h3>
      </header>

      <nav className="flex flex-wrap gap-2 mb-10">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${
              activeTab === status 
                ? 'bg-[#4B5E53] text-white shadow-lg shadow-[#4b5e53]/20' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </nav>

      <section className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onDetail={handleViewDetail} 
              formatCurrency={formatCurrency}
            />
          ))
        ) : (
          <EmptyOrders onStartShopping={handleStartShopping} />
        )}
      </section>
    </div>
  );
};

export default OrdersPage;