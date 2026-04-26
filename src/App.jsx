import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileSideBarLayout";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  Home, Store, ProductDetail, Login, SignUp,
  Cart, Checkout, Payment, ProfileInfoPage,
  AddressPage, OrdersPage
} from "./pages/user/index";
import VerifyOTP from "./pages/auth/VerifyOtpPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminOrders from "./pages/admin/AdminOrders"; 
import AdminTransactionHistory from "./pages/admin/AdminTransactionHistroy"; 

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#ffffff",
                color: "#1a1a1a",
                borderRadius: "16px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid #f0f0f0",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
              },
              success: { iconTheme: { primary: "#2D5A43", secondary: "#fff" } },
              error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
            }}
          />

          <Routes>
            {/* ── PUBLIC & USER ROUTES (MainLayout) ── */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              {/* Protected for BOTH User & Admin */}
              <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route index element={<ProfileInfoPage />} />
                  <Route path="address" element={<AddressPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                </Route>
              </Route>
            </Route>

            {/* ── AUTH ROUTES ── */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />

            {/* ── ADMIN ONLY ROUTES (Independent Layout) ── */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/transactions" element={<AdminTransactionHistory />} />
            </Route>

            {/* ── ERROR PAGES ── */}
            <Route path="/unauthorized" element={
              <div className="flex h-screen items-center justify-center flex-col gap-3 bg-slate-50">
                <h1 className="text-6xl font-black text-slate-200">403</h1>
                <p className="text-xl font-bold text-slate-800">Akses Ditolak</p>
                <p className="text-slate-500 text-center max-w-xs">
                  Maaf, akun Anda tidak memiliki izin untuk mengakses halaman ini.
                </p>
                <button 
                  onClick={() => window.location.href = "/"}
                  className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-all"
                >
                  Kembali ke Beranda
                </button>
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;