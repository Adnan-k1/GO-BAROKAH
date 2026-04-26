import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/authService';
import toast from 'react-hot-toast';

export const useSignupLogic = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

 const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        username: formData.username, 
        email: formData.email,
        password: formData.password
      };
      
      await authService.register(payload); 
      toast.success('Pendaftaran berhasil! Cek email untuk kode OTP.');
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal mendaftar";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, isLoading, showPassword, handleChange, handleSignUp, togglePassword };
};