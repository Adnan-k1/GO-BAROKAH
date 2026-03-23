import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const useLoginLogic = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login: setGlobalUser } = useAuth();
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const user = authService.login(formData.email, formData.password);
      setGlobalUser(user);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    formData,
    handleChange,
    handleLogin
  };
};