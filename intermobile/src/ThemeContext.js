// src/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { themes } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default'); // Valor inicial del tema

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);