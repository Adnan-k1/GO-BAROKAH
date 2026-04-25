import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

/**
 * useAdminProfile
 * Mengelola update data profil admin (nama, username, foto).
 */
export const useAdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);
  const [success, setSuccess]     = useState(false);

  const handleUpdateProfile = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const res = await fetch(`${BASE_URL}/users/profile`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Gagal memperbarui profil");
      }

      const data = await res.json();

      // Update AuthContext + localStorage supaya sidebar ikut update
      const updatedUser = { ...user, ...data };
      updateUser(updatedUser);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, error, success, handleUpdateProfile };
};