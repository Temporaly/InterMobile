import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  background: '#ffffff',
  mainColor: '#095DB7',
  darkerMain: "#083E78",
  lighterMain: "#3A95B5",
  text: '#000000',
};

const darkTheme = {
  background: '#000000',
  mainColor: '#5b5b5b',
  darkerMain: "#292929",
  lighterMain: "#919191",
  text: '#ffffff',
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

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
