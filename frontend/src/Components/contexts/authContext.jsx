import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext2 = createContext();

// AuthProvider component to provide auth state and functions
export const AuthProvider2 = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check local storage for an existing token on initial render
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setIsAuthenticated(true);
      setUserToken(storedToken);
    }
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    setUserToken(token);
    localStorage.setItem("userToken", token); // Persist token to localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserToken(null);
    localStorage.removeItem("userToken"); // Remove token from localStorage
  };

  return (
    <AuthContext2.Provider
      value={{ isAuthenticated, userToken, login, logout }}
    >
      {children}
    </AuthContext2.Provider>
  );
};

// Custom hook to use auth context
export const useUserAuth = () => {
  const context = useContext(AuthContext2);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
