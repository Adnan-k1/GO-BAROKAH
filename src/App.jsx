import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 


import Navbar from './components/layouts/Navbar';
import ProfileLayout from './components/layouts/ProfileSideBarLayout'; 


import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail'; 
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Cart from './pages/Cart';


import ProfileInfoPage from './pages/Profile'; 
import AddressPage from './pages/AddressPage'; 
import OrdersPage from './pages/OrdersPage';


const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const noLayoutPages = ['/login', '/signup'];
  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {showLayout && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showLayout && (
        <footer className="bg-[#2D5A43] py-8 text-center text-white text-[10px] font-bold uppercase tracking-[0.3em] border-t border-white/10">
          COPYRIGHTS SITE.COM. ALL RIGHTS RESERVED
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <LayoutWrapper>
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />

              
              <Route path="/profile" element={<ProfileLayout />}>
                
                <Route index element={<ProfileInfoPage />} /> 
                <Route path="address" element={<AddressPage />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route> 

              
              <Route path="*" element={<Home />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;