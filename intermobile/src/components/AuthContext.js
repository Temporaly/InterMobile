import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: '',
    password: '',
    IDUsuario: null, // Agregado para almacenar el IDUsuario
    isLoggedIn: false,
  });

  const login = (username, password, idUsuario) => {
    setAuth({ username, password, IDUsuario: idUsuario, isLoggedIn: true });
  };

  const logout = () => {
    setAuth({ username: '', password: '', IDUsuario: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
