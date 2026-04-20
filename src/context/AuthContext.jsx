import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("user_session");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); 
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user_session", JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    } 
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user_session", JSON.stringify(newUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); 
  };

  return (
   <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);