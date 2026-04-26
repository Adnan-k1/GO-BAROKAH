import React, { useState, useEffect } from "react";
import { Check, Mail, AtSign, Loader, Shield } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAdminProfile } from "../../hooks/admin/useAdminProfile";

const AdminProfile = () => {
  const { user, isLoading, handleUpdateProfile } = useAdminProfile();
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);
  
  const isChanged = form.username !== user?.username;
  const labelStyle = "text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2";
  const inputStyle = "w-full px-5 py-3.5 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:border-emerald-600 outline-none transition-all shadow-sm";

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto px-10 py-12 custom-scrollbar">
        <header className="mb-10 pb-6 border-b border-slate-200/60 max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Profil Administrator</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola informasi akses akun UD. BAROKAH.</p>
        </header>

        <div className="max-w-4xl">
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              if (isChanged) handleUpdateProfile(form); 
            }} 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className={labelStyle}>
                    <AtSign size={13} className="text-slate-400" /> Username
                  </label>
                  <input 
                    type="text" 
                    value={form.username} 
                    onChange={(e) => setForm({...form, username: e.target.value})} 
                    className={inputStyle} 
                    placeholder="Masukkan username baru" 
                  />
                </div>
                <div className="space-y-2.5">
                  <label className={labelStyle}>
                    <Mail size={13} className="text-slate-400" /> Email Terdaftar
                  </label>
                  <input 
                    type="email" 
                    value={form.email} 
                    disabled 
                    className={`${inputStyle} bg-slate-50 text-slate-400 cursor-not-allowed`} 
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading || !isChanged} 
                  className="flex items-center gap-2.5 px-10 py-3 bg-[#1a4d2e] hover:bg-[#143d24] text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-emerald-900/10"
                >
                  {isLoading ? <Loader size={16} className="animate-spin" /> : <Check size={17} />}
                  Simpan Perubahan
                </button>
              </div>
            </div>

            {/* Right Side: Info Akun */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 text-slate-800 border-b border-slate-50 pb-4">
                  <Shield size={20} className="text-emerald-600" />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Status Akun</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">Level Akses</span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 uppercase">
                      {user?.role || "Admin"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">Status Akun</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Aktif
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed text-center">
                    "Kredensial login dikelola oleh sistem developer. Hubungi administrator teknis untuk perubahan data sensitif."
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;