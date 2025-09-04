// src/context/AuthProvider.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // <-- Import from the new file

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    navigate('/perfil');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}