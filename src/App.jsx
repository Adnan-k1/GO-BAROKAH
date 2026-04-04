import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import MainLayout from './components/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileLayout from './layouts/ProfileSideBarLayout'; 
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail'; 
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Cart from './pages/Cart';
import ProfileInfoPage from './pages/Profile'; 
import AddressPage from './pages/AddressPage'; 
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/profile" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
                <Route index element={<ProfileInfoPage />} /> 
                <Route path="address" element={<AddressPage />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route> 

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainLayout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;