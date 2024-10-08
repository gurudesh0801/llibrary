import React, { createContext, useContext, useState } from "react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);

  const login = async () => {
    try {
      const response = await fetch(`${BASE_URL}/checkrole`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setRole(data.Token ? data.Role : null);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ role, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
