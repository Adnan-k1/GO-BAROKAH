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
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '', 
        email: user.email || '',
        phone: user.phone_number || '',  
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
      const currentId = user._id || user.id;
      if (!currentId){
        throw new Error("User ID tidak ditemukan. ");
      }
      const payload = {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone 
      };
      const response = await userService.updateProfile(payload);
      const dataTerbaru = response.data || response;

      updateUser({ ...user, ...payload});
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