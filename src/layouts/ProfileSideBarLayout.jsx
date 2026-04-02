import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { User, MapPin, ClipboardList, LogOut } from 'lucide-react';
import { useProfileLogic } from '../hooks/useProfileLogic';

const ProfileSideBarLayout = () => {
  const { user, handleLogout } = useProfileLogic();

  const navLinkStyle = ({ isActive }) => 
    `flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
      isActive 
        ? 'bg-[#D1E2D9] text-[#2D5A43] font-bold shadow-sm' 
        : 'text-gray-500 hover:bg-white hover:text-[#2D5A43]'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 flex flex-col lg:flex-row gap-8">
 
      <aside className="w-full lg:w-1/3">
        <div className="bg-[#F3F5F7] rounded-[32px] p-8 border border-gray-100 text-center">

          <div className="w-24 h-24 bg-[#D1E2D9] rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-sm">
            <User size={48} className="text-[#2D5A43]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 capitalize">
            {user?.name || 'User Barokah'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">{user?.email}</p>

       
          <nav className="mt-10 space-y-3 text-left">
            <NavLink to="/profile" end className={navLinkStyle}>
              <User size={20} />
              <div className="flex flex-col">
                <span className="text-sm">Informasi Profil</span>
                <span className="text-[10px] font-normal opacity-60">Kelola info profil Anda</span>
              </div>
            </NavLink>

            <NavLink to="/profile/address" className={navLinkStyle}>
              <MapPin size={20} />
              <div className="flex flex-col">
                <span className="text-sm">Alamat</span>
                <span className="text-[10px] font-normal opacity-60">Kelola alamat pengiriman</span>
              </div>
            </NavLink>

            <NavLink to="/profile/orders" className={navLinkStyle}>
              <ClipboardList size={20} />
              <div className="flex flex-col">
                <span className="text-sm">Riwayat Pesanan</span>
                <span className="text-[10px] font-normal opacity-60">Lihat transaksi Anda</span>
              </div>
            </NavLink>

            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-4 font-bold"
            >
              <LogOut size={20} />
              <div className="flex flex-col text-left">
                <span className="text-sm">Logout</span>
                <span className="text-[10px] font-normal opacity-60">Keluar dari akun</span>
              </div>
            </button>
          </nav>
        </div>
      </aside>

     
      <main className="flex-1">
        <div className="animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfileSideBarLayout;