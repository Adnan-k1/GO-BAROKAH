import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useProfileLogic = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const nameParts = user?.name ? user.name.split(' ') : ['', ''];

  return { user, nameParts, handleLogout };
};