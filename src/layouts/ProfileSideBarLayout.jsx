import { Outlet, NavLink } from 'react-router-dom';
import { User, MapPin, ShoppingBag, LogOut } from 'lucide-react';
import { useProfileLogic } from '../hooks/useProfileLogic';

const ProfileSideBarLayout = () => {
  const { user, handleLogout } = useProfileLogic();

  const navLinkStyle = ({ isActive }) => 
    `flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
      isActive 
        ? 'bg-[#E8F5EE] text-[#2D5A43] font-medium shadow-sm' 
        : 'text-gray-900 hover:bg-gray-50'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <aside className="w-full lg:w-[360px] sticky top-10">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100 mb-8">
              <div className="w-20 h-20 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-4">
                <User size={32} className="text-[#2D5A43]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight capitalize">
                {user?.name || 'Gian Adnan'}
              </h2>
              <p className="text-gray-400 text-sm font-normal">
                {user?.email || 'gianadnan@gmail.com'}
              </p>
            </div>
            <nav className="space-y-2">
              <NavLink to="/profile" end className={navLinkStyle}>
                <User size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold leading-tight">Informasi Profil</span>
                  <span className="text-[12px] text-gray-400 font-normal">Kelola informasi profil Anda</span>
                </div>
              </NavLink>

              <NavLink to="/profile/address" className={navLinkStyle}>
                <MapPin size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold leading-tight">Alamat</span>
                  <span className="text-[12px] text-gray-400 font-normal">Kelola alamat pengiriman Anda</span>
                </div>
              </NavLink>

              <NavLink to="/profile/orders" className={navLinkStyle}>
                <ShoppingBag size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold leading-tight">Riwayat Pesanan</span>
                  <span className="text-[12px] text-gray-400 font-normal">Lihat riwayat pesanan Anda</span>
                </div>
              </NavLink>

              <button 
                onClick={handleLogout} 
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-2 group"
              >
                <LogOut size={22} strokeWidth={1.5} />
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-semibold leading-tight">Logout</span>
                  <span className="text-[12px] text-gray-400 font-normal group-hover:text-red-300">Logout dari akun</span>
                </div>
              </button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 w-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default ProfileSideBarLayout;