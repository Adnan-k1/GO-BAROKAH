import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useLoginLogic = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: setGlobalUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.login(formData);
      
      // Ambil data account dan token dari response Raden (backend)
      const user = result?.data?.account; 
      const token = result?.data?.token;

      if (token && user) { 
        // 1. Simpan token ke localStorage
        localStorage.setItem('token', token);
        
        // 2. Set user ke context global (AuthContext)
        setGlobalUser(user);

        toast.success(`Selamat Datang, ${user.username || 'di UD Barokah'}!`, {
          style: { 
            borderRadius: '16px', 
            background: '#2D5A43', 
            color: '#fff', 
            fontWeight: 'bold' 
          },
        });

        // 3. LOGIKA REDIRECT PROFESIONAL (GAK HARD-CODE)
        setTimeout(() => { 
          // Cek role dari database
          if (user.role === 'admin') {
            // Kalau dia admin, lempar ke dashboard admin
            navigate('/admin/dashboard', { replace: true });
          } else {
            // Kalau dia user biasa, baru lempar ke profile
            navigate('/profile', { replace: true });
          }
        }, 1000);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Email atau password salah.";
      setError(errMsg); 
      toast.error(errMsg);

      // REDIRECT JIKA BELUM VERIFIKASI (OTP)
      if (errMsg.toLowerCase().includes("verifikasi") || errMsg.toLowerCase().includes("otp")) {
        setTimeout(() => {
          navigate('/verify-otp', { state: { email: formData.email } });
        }, 1500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, handleChange, handleLogin, isLoading, error };
};