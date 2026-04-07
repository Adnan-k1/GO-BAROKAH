import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 

// Components & Layouts
import Navbar from './layouts/Navbar';
import ProfileLayout from './layouts/ProfileSideBarLayout'; 
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail'; 
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // Dari branch teman
import Payment from './pages/Payment';   // Dari branch teman
import ProfileInfoPage from './pages/Profile'; 
import AddressPage from './pages/AddressPage'; 
import OrdersPage from './pages/OrdersPage';

// Wrapper untuk mengatur Layout (Navbar & Footer)
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // Halaman yang tidak pakai Navbar/Footer
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
          COPYRIGHTS UD BAROKAH. ALL RIGHTS RESERVED
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
          <ScrollToTop />
          {/* Konfigurasi Toaster tetap dipertahankan */}
          <Toaster 
            position="top-center" 
            reverseOrder={false} 
            toastOptions={{
              className: 'font-sans text-sm',
              success: {
                style: {
                  background: '#2D5A43',
                  color: '#fff',
                  borderRadius: '12px',
                },
              },
            }}
          />
          
          <LayoutWrapper>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Checkout & Payment (Fitur Baru) */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />

              {/* Profile Routes dengan ProtectedRoute */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfileLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProfileInfoPage />} /> 
                <Route path="address" element={<AddressPage />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route> 

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainLayout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;