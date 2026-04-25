import React, { useState, useEffect, useRef } from "react";
import { Camera, Check, AlertCircle, Loader, User, Mail, AtSign, Shield } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAdminProfile } from "../../hooks/admin/useAdminProfile";

/**
 * AdminProfile
 * Halaman profil penuh di /admin/profile
 */
const AdminProfile = () => {
  const { user, isLoading, error, success, handleUpdateProfile } = useAdminProfile();
  const fileRef = useRef(null);

  const [form, setForm]       = useState({ name: "", username: "", email: "", photo_url: "" });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name:      user.name      ?? user.username ?? "",
        username:  user.username  ?? "",
        email:     user.email     ?? "",
        photo_url: user.photo_url ?? user.avatar ?? "",
      });
      setPreview(user.photo_url ?? user.avatar ?? null);
    }
  }, [user]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => set("photo_url", reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateProfile(form);
  };

  const initials = (form.name || form.username || "A")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profil Saya</h1>
          <p className="text-sm text-slate-400 mt-0.5">Kelola informasi akun admin kamu</p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-4xl">

          {/* Left — Avatar card */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col items-center text-center gap-4">
              {/* Avatar */}
              <div className="relative">
                {preview ? (
                  <img src={preview} alt="avatar" className="w-24 h-24 rounded-2xl object-cover shadow-md" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-[#1a4d2e] flex items-center justify-center text-white font-bold text-3xl shadow-md">
                    {initials}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#1a4d2e] shadow-sm transition-colors"
                >
                  <Camera size={14} />
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />

              <div>
                <p className="font-bold text-slate-900">{form.name || form.username}</p>
                <p className="text-xs text-slate-400 mt-0.5">@{form.username}</p>
              </div>

              {/* Role badge */}
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100">
                <Shield size={11} />
                <span className="capitalize">{user?.role ?? "admin"}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                Klik ikon kamera untuk mengganti foto profil
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 space-y-5">
              <h3 className="font-bold text-slate-900 text-base mb-2">Informasi Akun</h3>

              {/* Nama */}
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <User size={12} /> Nama Lengkap
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
                />
              </div>

              {/* Username */}
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <AtSign size={12} /> Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => set("username", e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
                />
              </div>

              {/* Email (disabled) */}
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Mail size={12} /> Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-3 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed"
                />
                <p className="text-[10px] text-slate-400 mt-1.5">Email tidak dapat diubah.</p>
              </div>

              {/* Feedback */}
              {error && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-xl">
                  <Check size={14} /> Profil berhasil diperbarui!
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1a4d2e] hover:bg-[#14532D] text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-colors shadow-sm shadow-emerald-900/20"
                >
                  {isLoading
                    ? <><Loader size={14} className="animate-spin" /> Menyimpan...</>
                    : <><Check size={14} /> Simpan Perubahan</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;