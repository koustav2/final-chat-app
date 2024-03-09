/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userDetails = Cookies.get('user_details');
    return userDetails && Object.keys(JSON.parse(userDetails)).length !== 0;
  });

  useEffect(() => {
    const userDetails = Cookies.get('user_details');
    setIsAuthenticated(userDetails && Object.keys(JSON.parse(userDetails)).length !== 0);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);