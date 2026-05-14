import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { User, MapPin, ShoppingBag, LogOut, ChevronRight, Menu, X, LayoutGrid } from 'lucide-react';
import { useProfileLogic } from '../hooks/user/useProfileLogic';
import ConfirmModal from '../components/forms/ConfirmModal'; 

const ProfileSideBarLayout = () => {
  const { user, handleLogout } = useProfileLogic();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk toggle sidebar di mobile
  const location = useLocation();

  // Tutup sidebar otomatis setiap kali pindah halaman di mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navLinkStyle = ({ isActive }) => 
    `flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group border
    ${isActive 
      ? 'bg-emerald-50 border-emerald-100 shadow-sm' 
      : 'hover:bg-slate-50 border-transparent text-slate-500'}`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-16 pb-20 bg-[#FAFAFA] min-h-screen">
      
      {/* Floating Toggle Button Mobile */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] bg-[#2D5A43] text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-transform active:scale-95"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex flex-col lg:flex-row items-start gap-12 relative">
        
        {/* Overlay Mobile (Klik area gelap untuk tutup sidebar) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ASIDE (SIDEBAR) */}
        <aside className={`
          fixed inset-y-0 left-0 z-[50] w-[280px] bg-white p-6 shadow-2xl transition-transform duration-300 transform 
          lg:relative lg:translate-x-0 lg:z-0 lg:w-[300px] lg:bg-transparent lg:shadow-none lg:p-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:block'}
        `}>
          
          <div className="mb-10 lg:pl-2">
            <div className="flex items-center gap-3 mb-6">
              <LayoutGrid size={18} className="text-[#2D5A43]" strokeWidth={2.5} />
              <h3 className="font-black text-[11px] lg:text-[13px] uppercase tracking-[0.15em] text-[#2D5A43]">
                Pengaturan Akun
              </h3>
            </div>
            
            <div className="flex items-center gap-4 p-2 bg-slate-50 lg:bg-transparent rounded-2xl">
              <div className="w-12 h-12 bg-[#2D5A43] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/10">
                <User size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-black text-[13px] uppercase tracking-tight text-slate-900 truncate italic">
                  {user?.name || user?.username || 'Pelanggan'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                  {user?.email || 'Member'}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <NavLink to="/profile" end className={navLinkStyle}>
              {({ isActive }) => (
                <>
                  <div className={`w-5 h-5 flex items-center justify-center rounded-lg border-2 transition-all 
                    ${isActive ? 'border-[#2D5A43] bg-[#2D5A43] text-white' : 'border-slate-200 text-slate-400'}`}>
                    <User size={12} strokeWidth={3} />
                  </div>
                  <span className={`text-[12px] lg:text-[11px] font-black uppercase tracking-tight ${isActive ? 'text-[#2D5A43]' : ''}`}>
                    Informasi Profil
                  </span>
                  <ChevronRight size={14} className={`ml-auto ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </>
              )}
            </NavLink>

            <NavLink to="/profile/address" className={navLinkStyle}>
              {({ isActive }) => (
                <>
                  <div className={`w-5 h-5 flex items-center justify-center rounded-lg border-2 transition-all 
                    ${isActive ? 'border-[#2D5A43] bg-[#2D5A43] text-white' : 'border-slate-200 text-slate-400'}`}>
                    <MapPin size={12} strokeWidth={3} />
                  </div>
                  <span className={`text-[12px] lg:text-[11px] font-black uppercase tracking-tight ${isActive ? 'text-[#2D5A43]' : ''}`}>
                    Daftar Alamat
                  </span>
                  <ChevronRight size={14} className={`ml-auto ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </>
              )}
            </NavLink>

            <NavLink to="/profile/orders" className={navLinkStyle}>
              {({ isActive }) => (
                <>
                  <div className={`w-5 h-5 flex items-center justify-center rounded-lg border-2 transition-all 
                    ${isActive ? 'border-[#2D5A43] bg-[#2D5A43] text-white' : 'border-slate-200 text-slate-400'}`}>
                    <ShoppingBag size={12} strokeWidth={3} />
                  </div>
                  <span className={`text-[12px] lg:text-[11px] font-black uppercase tracking-tight ${isActive ? 'text-[#2D5A43]' : ''}`}>
                    Riwayat Belanja
                  </span>
                  <ChevronRight size={14} className={`ml-auto ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </>
              )}
            </NavLink>

            <div className="h-[1px] bg-slate-100 my-4 mx-2" />

            <button 
              onClick={() => setIsLogoutModalOpen(true)} 
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 text-red-500"
            >
              <div className="w-5 h-5 flex items-center justify-center rounded-lg border-2 border-red-100 text-red-400">
                <LogOut size={12} strokeWidth={3} />
              </div>
              <span className="text-[12px] lg:text-[11px] font-black uppercase tracking-tight">
                Keluar Sesi
              </span>
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full min-w-0">
          {/* Header Mobile untuk buka sidebar (Alternatif tombol floating) */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
             <h2 className="font-black text-[14px] uppercase tracking-widest text-slate-800 italic">Menu Profil</h2>
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 text-[#2D5A43] font-black text-[10px] uppercase tracking-wider"
             >
                Pilih Menu <Menu size={16} />
             </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>

      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Konfirmasi Keluar"
        message="Sesi belanja Anda akan diakhiri. Yakin ingin melanjutkan?"
        confirmText="Ya, Logout"
      />
    </div>
  );
};

export default ProfileSideBarLayout;