import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage if it exists
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function to update user data
  const updateUser = (newUser) => {
    setUser(newUser);
    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Function to clear user data (logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
