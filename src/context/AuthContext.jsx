import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user_session");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Auth Error:", err);
        localStorage.removeItem("user_session");
      }
    }
    setLoading(false);
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