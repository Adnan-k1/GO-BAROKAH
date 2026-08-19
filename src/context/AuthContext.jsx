import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth/authService";
import {
  AUTH_SESSION_EXPIRED_EVENT,
  clearAuthSession,
  getSavedUser,
  getToken,
  setAuthSession,
  setSavedUser,
} from "../utils/authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      const savedUser = getSavedUser();

      if (!token) {
        clearAuthSession();
        setLoading(false);
        return;
      }

      if (savedUser) setUser(savedUser);

      try {
        const response = await authService.getMe();
        const serverUser = response?.user || response?.data?.user || response?.account || response;
        const validUser = {
          ...savedUser,
          ...serverUser,
        };

        setUser(validUser);
        setSavedUser(validUser);
      } catch (err) {
        console.error("Auth Error (Token Invalid/Expired):", err);
        setUser(null);
        clearAuthSession();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    if (!userData || !token) return;

    setUser(userData);
    setAuthSession(userData, token);
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    setSavedUser(newUserData);
  };

  const logout = () => {
    setUser(null);
    clearAuthSession();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
