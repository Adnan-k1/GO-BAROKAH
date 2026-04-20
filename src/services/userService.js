import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token')?.replace(/['"]+/g, '');
  return { 
    'Authorization': `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true' 
  };
};

export const userService = {
 updateProfile: async (userData) => { 
    const response = await axios.patch(`${API_URL}/api/users`, userData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  getProfile: async (userId) => {
    const response = await axios.get(`${API_URL}/api/users/${userId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};