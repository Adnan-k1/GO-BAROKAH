import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { User, MapPin, ShoppingBag, LogOut } from 'lucide-react';
import { useProfileLogic } from '../hooks/user/useProfileLogic';
import ConfirmModal from '../components/forms/ConfirmModal'; 

const ProfileSideBarLayout = () => {
  const { user, handleLogout } = useProfileLogic();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navLinkStyle = ({ isActive }) => 
    `flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
      isActive 
        ? 'bg-[#E8F5EE] text-[#2D5A43] font-bold shadow-sm' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 bg-[#FAFAFA] min-h-screen">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        <aside className="w-full lg:w-[360px] lg:sticky lg:top-10">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

            <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100 mb-8">
              <div className="w-20 h-20 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                <User size={32} className="text-[#2D5A43]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight capitalize">
                {user?.name || user?.username || 'Memuat Nama...'}
              </h2>
              <p className="text-gray-400 text-sm font-normal">
                {user?.email || 'Memuat Email...'}
              </p>
            </div>

            <nav className="space-y-2">
              <NavLink to="/profile" end className={navLinkStyle}>
                <User size={22} strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="text-[15px] leading-tight">Informasi Profil</span>
                  <span className="text-[12px] text-gray-400 font-normal">Kelola data diri Anda</span>
                </div>
              </NavLink>

              <NavLink to="/profile/address" className={navLinkStyle}>
                <MapPin size={22} strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="text-[15px] leading-tight">Alamat</span>
                  <span className="text-[12px] text-gray-400 font-normal">Kelola alamat pengiriman</span>
                </div>
              </NavLink>

              <NavLink to="/profile/orders" className={navLinkStyle}>
                <ShoppingBag size={22} strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="text-[15px] leading-tight">Riwayat Pesanan</span>
                  <span className="text-[12px] text-gray-400 font-normal">Cek status pesanan</span>
                </div>
              </NavLink>
              <button 
                onClick={() => setIsLogoutModalOpen(true)} 
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-4 group border border-transparent hover:border-red-100"
              >
                <div className="bg-red-50 p-2 rounded-xl group-hover:bg-red-100 transition-colors">
                  <LogOut size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-bold leading-tight">Logout</span>
                  <span className="text-[12px] text-gray-400 font-normal group-hover:text-red-400">
                    Keluar dari aplikasi
                  </span>
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
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Yakin ingin Keluar?"
        message="Anda akan keluar dari akun Barokah. Anda perlu login kembali untuk mengakses profil dan riwayat pesanan."
        confirmText="Ya, Logout"
      />
    </div>
  );
};

export default ProfileSideBarLayout;