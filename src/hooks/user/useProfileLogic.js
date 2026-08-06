import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { userService } from '../../services/user/userService';

export const useProfileLogic = () => {
  const { user, logout, updateUser } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    phone_number_verified: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || user.name || '',
        email: user.email || '',
        phone: user.phone_number || user.phoneNumber || '',
        phone_number_verified: user.phone_number_verified === true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    const loadingToast = toast.loading("Menyimpan perubahan...");
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone,
      };

      const isPhoneChanged = formData.phone !== (user.phone_number || user.phoneNumber);

      const response = await userService.updateProfile(payload);
      const rawData = response?.data?.data || response?.data || response || {};

      const updatedUser = {
        ...user,
        ...payload,
        phone_number: rawData.phoneNumber ?? rawData.phone_number ?? payload.phone_number,
        username: rawData.name ?? rawData.username ?? payload.username,
        email_verified: rawData.emailVerified ?? rawData.email_verified ?? user.email_verified,
      };

      if (isPhoneChanged) {
        updatedUser.phone_number_verified = false;
      } else {
        updatedUser.phone_number_verified = rawData.phoneNumberVerified ?? rawData.phone_number_verified ?? user.phone_number_verified;
      }

      updateUser(updatedUser);
      toast.success('Profil diperbarui!', { id: loadingToast });
    } catch (err) {
      console.log("ERROR DETAIL:", err);
      toast.error(err.response?.data?.message || 'Gagal simpan ke database', { id: loadingToast });
    }
  };

  

  const handleLogout = () => {
    logout(); 
    toast.success('Berhasil keluar!', {
      style: {
        borderRadius: '16px',
        background: '#2D5A43', 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '12px'
      },
      duration: 3000
    });
    navigate('/login', { replace: true });
  };

  return {
    user,
    formData,      
    handleChange,  
    saveProfile,   
    handleLogout
  };
};