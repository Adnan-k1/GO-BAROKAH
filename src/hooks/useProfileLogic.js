import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useProfileLogic = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
   
    localStorage.removeItem('token');
    localStorage.removeItem('user');

   
    toast.success('Berhasil keluar. Sampai jumpa kembali!', {
      icon: '👋',
      style: {
        borderRadius: '16px',
        background: '#2D5A43',
        color: '#fff',
      },
      duration: 3000
    });

    
    navigate('/login', { replace: true });
  };

  return {
    user,
    handleLogout
  };
};