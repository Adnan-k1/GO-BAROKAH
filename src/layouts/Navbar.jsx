import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        <Link to="/" className="flex-shrink-0 group">
          <div className="flex flex-col items-start">
            <h1 className="text-[#2D5A43] text-2xl font-black tracking-tighter leading-none uppercase transition-transform group-hover:scale-95">
              UD. Barokah
            </h1>
            <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent mt-0.5 opacity-70"></div>
          </div>
        </Link>
        <div className="flex-1 max-w-2xl relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#2D5A43] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Cari produk organik..."
            className="w-full bg-[#F3F5F7] border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#2D5A43]/20 transition-all outline-none font-medium"
          />
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li>
              <Link to="/" className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive('/') ? 'text-[#2D5A43]' : 'text-gray-400 hover:text-black'}`}>Home</Link>
            </li>
            <li>
              <Link to="/store" className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive('/store') ? 'text-[#2D5A43]' : 'text-gray-400 hover:text-black'}`}>Shop</Link>
            </li>
          </ul>

          <div className="flex items-center gap-5 border-l pl-8 border-gray-100">
            <Link to="/cart" className="relative text-gray-800 hover:text-[#2D5A43] transition-colors group">
              <ShoppingCart className="w-6 h-6 stroke-[1.5] group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link 
              to={user ? "/profile" : "/login"} 
              className="flex items-center gap-3 text-gray-800 hover:text-[#2D5A43] transition-colors group"
            >
              <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:border-[#2D5A43]/30 group-hover:bg-[#2D5A43]/5 transition-all">
                <User className="w-5 h-5 stroke-[1.5]" />
              </div>

              <div className="flex flex-col">
                {user ? (
                  <>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Akun</span>
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-tighter leading-none">
                      {user.name?.split(' ')[0] || user.username?.split(' ')[0] || "User"}
                    </span>
                  </>
                ) : (
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Masuk</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;