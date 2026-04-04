import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, isAuthenticated } = useAuth(); 
  const location = useLocation();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        
        <Link to="/" className="flex-shrink-0">
          <div className="flex flex-col items-start">
            <h1 className="text-[#2D5A43] text-2xl font-black tracking-tighter leading-none italic">
              UD. BAROKAH
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
            placeholder="Search"
            className="w-full bg-[#F3F5F7] border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#2D5A43]/20 transition-all outline-none"
          />
        </div>

        
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li>
              <Link to="/" className={`text-sm font-bold uppercase tracking-wider transition-colors ${location.pathname === '/' ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className={`text-sm font-bold uppercase tracking-wider transition-colors ${location.pathname === '/store' ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
                Shop
              </Link>
            </li>
          </ul>

          
          <div className="flex items-center gap-5 border-l pl-8 border-gray-100">
            <Link to="/cart" className="relative text-gray-800 hover:text-[#2D5A43] transition-colors">
              <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            
            <Link 
              to={isAuthenticated ? "/profile" : "/login"} 
              className="flex items-center gap-2 text-gray-800 hover:text-[#2D5A43] transition-colors group"
            >
              <User className="w-6 h-6 stroke-[1.5]" />
              {isAuthenticated && (
                <span className="text-[10px] font-bold uppercase hidden md:block">
                  {user?.name?.split(' ')[0]}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;