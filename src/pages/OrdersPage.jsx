import { ClipboardList, Eye, ShoppingBag } from 'lucide-react';
import { useOrderLogic } from '../hooks/useOrderLogic';
import Button from '../components/common/Button';

const OrdersPage = () => {
  const { 
    orders, 
    activeTab, 
    setActiveTab, 
    statuses, 
    formatCurrency, 
    handleStartShopping, 
    handleViewDetail 
  } = useOrderLogic();

  return (
    <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[600px]">
      <header className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Riwayat Pesanan</h3>
        <p className="text-sm text-gray-400 mt-1 font-normal">Pantau status dan riwayat belanja Anda di sini</p>
      </header>
      <nav className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {statuses.map((status) => (
          <Button
            key={status}
            onClick={() => setActiveTab(status)}
            variant={activeTab === status ? 'primary' : 'ghost'}
            className={`
              px-7 py-3 text-[12px] whitespace-nowrap transition-all duration-300
              ${activeTab === status 
                ? 'shadow-lg scale-[1.02]' 
                : 'text-gray-400 hover:bg-gray-100'
              }
            `}
          >
            {status}
          </Button>
        ))}
      </nav>
      <section className="space-y-8">
        {orders.length > 0 ? (
          orders.map(({ id, date, status, items, total }) => (
            <div 
              key={id} 
              className="bg-white border border-gray-100 rounded-[28px] overflow-hidden hover:shadow-[0_10px_40px_rgb(0,0,0,0.03)] transition-all duration-500 group"
            >
              <div className="px-7 py-5 flex justify-between items-center bg-[#F8FAF9]/50 border-b border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="bg-[#3A5A4D] p-3 rounded-xl text-white shadow-lg shadow-green-900/10">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-gray-900 leading-none">{id}</p>
                    <p className="text-[12px] text-gray-400 font-medium mt-1.5">{date}</p>
                  </div>
                </div>
                <span className="bg-[#E8F5EE] text-[#3A5A4D] text-[11px] px-4 py-1.5 rounded-xl font-bold uppercase tracking-wider">
                  {status}
                </span>
              </div>
              <div className="px-8 py-6 space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[14px]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      <span className="text-gray-600 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{formatCurrency(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="px-8 py-6 bg-[#F8FAF9]/30 border-t border-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Pesanan</p>
                  <p className="text-xl font-black text-[#3A5A4D] tracking-tight">{formatCurrency(total)}</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewDetail(id)} 
                    className="px-6 py-3 text-[12px] flex items-center gap-2"
                  >
                    <Eye size={16} /> Detail
                  </Button>
                  <Button 
                    variant="primary"
                    className="px-7 py-3 text-[12px]"
                    onClick={() => console.log("Beli lagi")}
                  >
                    Beli Lagi
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-28 bg-[#FDFDFD] rounded-[32px] border-2 border-dashed border-gray-100">
            <div className="bg-white p-7 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 border border-gray-50">
              <ShoppingBag size={48} className="text-[#3A5A4D] opacity-20" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">Belum Ada Pesanan</h4>
            <p className="text-[14px] text-gray-400 max-w-xs mt-2 mb-10 leading-relaxed">
              Sepertinya keranjang belanjamu masih menunggu. Yuk, cari barang impianmu sekarang!
            </p>
            <Button 
              variant="primary"
              onClick={handleStartShopping} 
              className="px-10 py-4 text-[13px]"
            >
              Mulai Belanja
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrdersPage;