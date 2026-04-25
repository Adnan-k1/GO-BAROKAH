import React, { useState, useEffect, useRef } from "react";
import { X, Camera, Check, AlertCircle, Loader } from "lucide-react";
import { useAdminProfile } from "../../hooks/admin/useAdminProfile";

/**
 * ProfileModal
 * Popup profil admin yang dipanggil dari sidebar.
 *
 * @param {function} onClose
 */
const ProfileModal = ({ onClose }) => {
  const { user, isLoading, error, success, handleUpdateProfile } = useAdminProfile();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name:      "",
    username:  "",
    email:     "",
    photo_url: "",
  });

  const [preview, setPreview] = useState(null);

  // Isi form dari data user
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

  // Preview foto lokal (opsional — kalau backend terima URL saja, ini bisa dihapus)
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    // Kalau backend terima base64:
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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Profil Saya</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              {preview ? (
                <img src={preview} alt="avatar" className="w-20 h-20 rounded-2xl object-cover shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#1a4d2e] flex items-center justify-center text-white font-bold text-2xl shadow-md">
                  {initials}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border-2 border-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#1a4d2e] shadow-sm transition-colors"
              >
                <Camera size={13} />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            <div className="text-center">
              <p className="text-sm font-bold text-slate-800">{form.name || form.username}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role ?? "admin"}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Nama Lengkap</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => set("username", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full px-4 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-400 mt-1">Email tidak dapat diubah.</p>
            </div>
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

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Tutup
            </button>
            <button type="submit" disabled={isLoading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-[#1a4d2e] hover:bg-[#14532D] disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {isLoading ? <><Loader size={14} className="animate-spin" /> Menyimpan...</> : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;