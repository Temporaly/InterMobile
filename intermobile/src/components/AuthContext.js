import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {
      username: '',
      password: '',
      IDUsuario: null,
      isLoggedIn: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = (username, password, idUsuario) => {
    setAuth({ username, password, IDUsuario: idUsuario, isLoggedIn: true });
  };

  const logout = () => {
    setAuth({ username: '', password: '', IDUsuario: null, isLoggedIn: false });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
