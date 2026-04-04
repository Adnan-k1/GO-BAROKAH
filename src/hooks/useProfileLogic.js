import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; 

export const useProfileLogic = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  });

  useEffect(() => {
    if (user) {
      const parts = user.name ? user.name.split(' ') : ['', ''];
      setFormData({
        firstName: parts[0] || '',
        lastName: parts[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      const loadingToast = toast.loading('Menyimpan perubahan...');
      setTimeout(() => {
        toast.dismiss(loadingToast);
        toast.success('Profil berhasil diperbarui!', {
          style: {
            borderRadius: '16px',
            background: '#2D5A43', 
            color: '#fff',
          },
        });
      }, 800);

    } catch (error) {
      toast.error('Gagal memperbarui profil. Coba lagi nanti.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Berhasil keluar!');
  };

  return { 
    user,
    formData,
    handleChange,
    saveProfile,
    handleLogout
  };
};