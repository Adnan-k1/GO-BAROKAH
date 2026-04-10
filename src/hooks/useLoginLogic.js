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
      const result = await authService.login(formData.email, formData.password);
      
     
      const token = result?.data?.token;
      const account = result?.data?.account;

      if (token) {
        
        setGlobalUser(account); 
        toast.success('Login Berhasil!');

        setTimeout(() => {
          navigate('/profile', { replace: true });
        }, 500);
      }
    } catch (err) {
      setError(err.message); 
      toast.error(err.message);
      
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, handleChange, handleLogin, isLoading, error };
};