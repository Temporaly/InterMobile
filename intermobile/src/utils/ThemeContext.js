import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  background: '#ffffff',
  mainColor: '#095DB7',
  darkerMain: "#083E78",
  lighterMain: "#3A95B5",
  secondaryColor: '#FBBC05',
  warnColor: '#ff0000',
  text: '#000000',
};

const darkTheme = {
  background: '#000000',
  mainColor: '#344C64',
  darkerMain: "#240750",
  lighterMain: "#577B8D",
  secondaryColor: '#57A6A1',
  warnColor: '#BE3144',
  text: '#ebebeb',
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const ThemeProvider = ({ children }) => {
  // Cargar el tema desde localStorage o usar el valor por defecto (light)
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    // Guardar el tema en localStorage cuando cambie
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

