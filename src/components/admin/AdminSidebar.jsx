import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, History, AlertTriangle, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ProfileModal from "./ProfileModal";

const NAV = [
  { id: "Dashboard",         icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "Produk",            icon: Package,         path: "/admin/inventory" },
  { id: "Kelola Pesanan",    icon: ClipboardList,   path: "/admin/orders"    },
  { id: "Riwayat Transaksi", icon: History,         path: "/admin/reports"   },
];

/**
 * AdminSidebar
 * Sidebar navigasi admin — klik avatar di bawah untuk buka ProfileModal.
 *
 * @param {number} alertCount - jumlah stok alert
 */
const AdminSidebar = ({ alertCount = 0 }) => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const initials = (user?.name ?? user?.username ?? "A")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <aside className="w-64 flex-shrink-0 flex flex-col bg-[#1a4d2e] px-5 py-7 gap-6">

        {/* Logo */}
        <div className="px-2 mb-2">
          <p className="text-xl font-black italic tracking-tight text-white">UD. BAROKAH</p>
          <div className="h-[3px] w-full bg-[#f5c518] rounded-full mt-1" />
          <p className="text-[10px] text-white/50 font-medium mt-2 uppercase tracking-widest">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-1">
          {NAV.map(({ id, icon: Icon, path }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                 ${isActive
                   ? "bg-white text-[#1a4d2e] font-semibold shadow-md"
                   : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} className={isActive ? "text-[#1a4d2e]" : "text-white/60"} />
                  <span>{id}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Alert badge */}
        {alertCount > 0 && (
          <div className="mx-1 p-4 bg-amber-500/20 rounded-2xl border border-amber-400/30">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={13} className="text-amber-300" />
              <span className="text-xs font-bold text-amber-300">{alertCount} Stok Menipis</span>
            </div>
            <p className="text-[11px] text-amber-300/70">Segera lakukan restock produk.</p>
          </div>
        )}

        {/* Profile card — klik untuk buka modal */}
        <div className="border-t border-white/10 pt-4 space-y-2">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors group text-left"
          >
            {user?.photo_url || user?.avatar ? (
              <img
                src={user.photo_url ?? user.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-xl object-cover flex-shrink-0 shadow"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:bg-white/30 transition-colors">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">
                {user?.name ?? user?.username ?? "Admin"}
              </p>
              <p className="text-[10px] text-white/50 capitalize">{user?.role ?? "administrator"}</p>
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default AdminSidebar;