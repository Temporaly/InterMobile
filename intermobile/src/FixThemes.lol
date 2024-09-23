--Header:

-UserText:
style="color: #efefef;"

-Dropdown: (Bootstrap)
style {
    --bs-btn-bg: #113359;
    --bs-btn-active-bg: #113359;
    --bs-btn-active-border-color: #113359;
    --bs-btn-hover-bg: #113359;
    --bs-btn-hover-border-color: #113359;}

--Page:

-WelcomeText:
style {
    color: #a7a7a7;
}

-Group1:

SaldoActual:
style {
    color: #a7a7a7;
}

AmmInc:
style {
    color: #dddddd;
}

Purchases:
style {
    color: #a7a7a7;
}

PurChild:
style {
    color: #757575;
}

-BtnGroup:

ClassBtn:
style {
    padding: 4% 25%;
    background: rgb(89 14 169);
    color: rgb(0, 0, 0);
    margin: 2.5% 5% 1.5%;
}

--Navbar:
style {
    background-color: #113359;
    border-radius: 10px;
    padding: 25px;
}

GPT's Implementation:

1. Define variables CSS en tu archivo CSS principal
Crea variables CSS para los colores y estilos que deseas cambiar. Puedes hacerlo para cada tema.

/* styles.css */

/* Variables para el tema claro */
:root {
  --background-color: white;
  --text-color: black;
}

/* Variables para el tema oscuro */
.dark {
  --background-color: black;
  --text-color: white;
}

/* Variables para el tema colorido */
.colorful {
  --background-color: #ffcc00;
  --text-color: #000;
}

/* Variables para el tema minimal */
.minimal {
  --background-color: #f0f0f0;
  --text-color: #333;
}

/* Aplicando las variables */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Otros estilos que usan las variables */
.button {
  background-color: var(--background-color);
  color: var(--text-color);
}

2. Modifica el contexto del tema
Usa el contexto para gestionar las clases de tema que se aplicarán al body.

/*ThemeContext.js*/

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = ['light', 'dark', 'colorful', 'minimal'];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // Valor por defecto
  });

  const toggleTheme = (newTheme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = currentTheme; // Cambia la clase del body
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

3. Crea el formulario para seleccionar el tema
Asegúrate de que el formulario pueda seleccionar entre los temas definidos.

/*ThemeForm.js*/

import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeForm = () => {
  const { toggleTheme, themes } = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const theme = event.target.theme.value;
    toggleTheme(theme);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Elige un tema:
        <select name="theme">
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)} {/* Capitaliza el primer carácter */}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Cambiar Tema</button>
    </form>
  );
};

export default ThemeForm;

4. Usa el formulario en tu aplicación
Usa el ThemeForm donde lo necesites en tu aplicación principal.

/*App.js*/

import React from 'react';
import ThemeForm from './ThemeForm';
import { ThemeProvider } from './ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Mi Aplicación</h1>
        <ThemeForm />
        {/* El resto de tu aplicación */}
      </div>
    </ThemeProvider>
  );
};

export default App;
