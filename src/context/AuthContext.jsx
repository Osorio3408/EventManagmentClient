import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Establece isLoggedIn a true si hay un token, de lo contrario, a false
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); // Remueve el token del localStorage
    setIsLoggedIn(false); // Actualiza el estado de isLoggedIn a false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
