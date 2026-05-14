import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"
    } border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="flex-shrink-0 group">
          <div className="flex flex-col items-start">
            <h1 className="text-[#2D5A43] text-xl sm:text-2xl font-black tracking-tighter leading-none uppercase">
              UD. Barokah
            </h1>
            <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent mt-0.5 opacity-70" />
          </div>
        </Link>

        {/* DESKTOP SEARCH - Sekarang lebih slim */}
        <div className="hidden md:flex flex-1 max-w-md relative group mx-4">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full bg-gray-50 border border-transparent rounded-full py-2.5 pl-11 pr-4 text-xs focus:bg-white focus:ring-2 focus:ring-[#2D5A43]/10 focus:border-[#2D5A43]/20 transition-all outline-none font-medium"
          />
        </div>

        {/* DESKTOP NAV & ACTIONS */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive('/') ? 'text-[#2D5A43]' : 'text-gray-400 hover:text-black'}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive('/store') ? 'text-[#2D5A43]' : 'text-gray-400 hover:text-black'}`}>
                Shop
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-5 border-l pl-6 border-gray-200">
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-800 hover:text-[#2D5A43] transition-all group">
              <ShoppingCart className="w-5 h-5 stroke-[2] group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Label - Logika asli dipertahankan */}
            <Link to={user ? "/profile" : "/login"} className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-[#2D5A43]/5 rounded-full flex items-center justify-center border border-[#2D5A43]/10 group-hover:bg-[#2D5A43] group-hover:text-white transition-all">
                <User className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                {user ? (
                  <>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Akun</span>
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-tighter leading-none group-hover:text-[#2D5A43]">
                      {user.name?.split(' ')[0] || user.username?.split(' ')[0] || "User"}
                    </span>
                  </>
                ) : (
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black">Masuk</span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex lg:hidden items-center gap-3">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500"
          >
            <Search size={18} />
          </button>
          
          <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center">
            <ShoppingCart size={20} className="text-gray-800" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2D5A43] text-white"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      <div className={`overflow-hidden transition-all duration-300 bg-white border-t border-gray-50 ${searchOpen ? 'max-h-20 opacity-100 py-3' : 'max-h-0 opacity-0'}`}>
        <div className="px-4">
          <input
            type="text"
            placeholder="Cari produk organik..."
            className="w-full bg-gray-50 rounded-xl py-3 px-5 text-sm outline-none focus:ring-2 focus:ring-[#2D5A43]/10"
          />
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-white border-t border-gray-100 ${menuOpen ? 'max-h-[500px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col gap-6">
          <Link to="/" className={`text-sm font-black uppercase tracking-[0.2em] ${isActive('/') ? 'text-[#2D5A43]' : 'text-gray-400'}`}>Home</Link>
          <Link to="/store" className={`text-sm font-black uppercase tracking-[0.2em] ${isActive('/store') ? 'text-[#2D5A43]' : 'text-gray-400'}`}>Shop</Link>
          
          <div className="h-px bg-gray-100 w-full my-2" />
          
          <Link to={user ? "/profile" : "/login"} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <User className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              {user ? (
                <>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Akun Profil</span>
                  <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">
                    {user.name || user.username || "User"}
                  </span>
                </>
              ) : (
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Masuk / Daftar</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;