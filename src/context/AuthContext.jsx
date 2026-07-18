import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user_session");

      if (savedUser) {
        // Fallback optimis untuk UI yang cepat
        try {
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("Parse Error:", err);
        }
      }

      if (token) {
        try {
          // Selalu verifikasi token ke server agar hacker tidak bisa spoofing role di localStorage
          const response = await authService.getMe();
          // Ekstrak data user sesuai response swagger ({ message: "...", user: {...} })
          const serverUser = response?.user || response?.data?.user || response?.account || response;
          
          // Gabungkan data dari localStorage (yang punya username & phone) dengan data server (menimpa role dengan yang asli)
          let validUser = serverUser;
          if (savedUser) {
            try {
              validUser = { ...JSON.parse(savedUser), ...serverUser };
            } catch (e) {}
          }

          setUser(validUser);
          localStorage.setItem("user_session", JSON.stringify(validUser));
        } catch (err) {
          console.error("Auth Error (Token Invalid/Expired):", err);
          // Tendang user keluar jika token ditolak server
          setUser(null);
          localStorage.removeItem("user_session");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user_session", JSON.stringify(userData));
    if (token) localStorage.setItem("token", token);
  };

  const updateUser = (newUserData) => {
  setUser(newUserData); 
  localStorage.setItem("user_session", JSON.stringify(newUserData)); 
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);