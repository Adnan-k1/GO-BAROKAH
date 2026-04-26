import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { adminService } from "../../services/admin/adminService";

export const useAdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const response = await adminService.updateProfile(formData);
      const result = response?.user || response?.data || response;
      const newUserState = { 
        ...user, 
        ...result, 
        username: formData.username 
      };
      updateUser(newUserState);
      toast.success("Profil berhasil diperbarui!");
      return { success: true };
    } catch (err) {
      console.error("Update Error:", err);
      const msg = err.response?.data?.message || "Gagal memperbarui profil";
      toast.error(msg);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [user, updateUser]);

  return { user, isLoading, handleUpdateProfile };
};