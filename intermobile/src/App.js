import React, { useState, createContext } from 'react';
import './App.css';
import Header from './components/Header.js'
import './bootstrap.css';
import BottomNavbar from './components/BottomNavbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Busqueda from './pages/Busqueda';
import Tienda from './pages/Tienda.js';
import Perfil from './pages/Perfil';
import Opciones from './pages/Opciones.js';
import CerrarSesion from './pages/CerrarSesion.js';
import Classes from './pages/Classes.js'

export const CurrencyContext = createContext();

//--- TPFinal
//Sprint 1: Buscar ✅
//Sprint 2: Home y Perfil ✅
//Sprint 3: Editar Perfil, Ver Clases Próximas y Opciónes ✅
//Sprint 4: Tienda y sistema de Usuarios (Login, Registro y Logout) - 14 oct.

//--- DAI
//Func 1: Configuración de Nro. Emergencia - Expo ⚠️
//Func 2: Mensajes al usuario - TPFinal ✅ - Arreglar bug de vibrar cuando no debe o no vibrar
//Func 3: Llamado de Emergencia - Expo ⚠️
//Func 7: Identificación de cada Aplicación- TPFinal ❎


function App() {

  const [currency, setCurrency] = useState('Intercoins'); // Default to Intercoins

  

  return (
    <Router>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <div className="App">
        <header className="bg">
          <Header/>
        </header>
        {/* Contenido de página iría acá */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Busqueda />} />
          <Route path="/Shop" element={<Tienda />} />
          <Route path="/Profile" element={<Perfil />} />
          <Route path="/Options" element={<Opciones />} />
          <Route path="/Logout" element={<CerrarSesion />} />
          <Route path="/Classes" element={<Classes />} />
        </Routes>
        <div id='Filler' className='fill'></div>
        <BottomNavbar />
      </div>
      </CurrencyContext.Provider>
    </Router>
  );
}
export default App;


/* OLD APP FUNC
function App() {
  return (
    <div className="App">
      <header class="bg">
        <Header/>
      </header>
      //Comienzo Busqueda
      <div id='queryGens'>
        <SearchBar/>
      </div>

      <div id='HomeRec'>
        <HomeRec/>
      <div id='Filler' className='fill'></div>
      </div>
      //Final Busqueda
      <div id='Filler' className='fill'></div>
      <BottomNavbar />
    </div>
  );
}
*/
//Supabase pass: PANbGhjFW2bj91qi
