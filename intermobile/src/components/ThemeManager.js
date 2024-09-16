import React, { useEffect } from 'react';

const ThemeManager = ({ theme }) => {
  useEffect(() => {
    console.log(`Applying ${theme} theme`);

    // Remove existing theme links
    const existingStyles = document.querySelectorAll('link[data-theme]');
    existingStyles.forEach(style => style.remove());

    // Add new theme styles
    const loadTheme = async () => {
      const themePaths = theme === 'dark'
        ? ['./CSS Themes/altdefault.css', './CSS Themes/AppAltDefault.css']
        : ['./CSS Themes/default.css', './CSS Themes/AppDefault.css'];

      console.log('Loading theme paths:', themePaths);

      for (const path of themePaths) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        link.dataset.theme = theme;
        document.head.appendChild(link);
      }
    };

    loadTheme();

    return () => {
      console.log('Cleaning up styles');
      // Clean up styles on unmount
      const existingStyles = document.querySelectorAll('link[data-theme]');
      existingStyles.forEach(style => style.remove());
    };
  }, [theme]);

  return null;
};

export default ThemeManager;