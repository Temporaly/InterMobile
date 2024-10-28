import React, { useState, createContext } from 'react';
import './App.css';
import Header from './components/Header.js';
import './bootstrap.css';
import BottomNavbar from './components/BottomNavbar.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Busqueda from './pages/Busqueda';
import Tienda from './pages/Tienda.js';
import Perfil from './pages/Perfil';
import Opciones from './pages/Opciones.js';
import Logout from './pages/Logout.js';
import Classes from './pages/Classes.js';
import QRCodeScanner from './pages/QRCodeScanner.js';
import LogCentral from './pages/FTL.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { AuthProvider, AuthContext } from './components/AuthContext.js';

export const CurrencyContext = createContext();

function App() {
  const [currency, setCurrency] = useState('Intercoins');

  return (
    <AuthProvider>
      <Router>
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
          <AuthContext.Consumer>
            {({ auth }) => (
              <div className="App">
                {/* Mostrar Header y BottomNavbar solo si el usuario está autenticado */}
                {auth.isLoggedIn && (
                  <>
                    <header id="Head" className="bg">
                      <Header />
                    </header>
                    <BottomNavbar />
                  </>
                )}
                <Routes>
                  {/* Rutas públicas */}
                  <Route path="/" element={<LogCentral />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Register" element={<Register />} />
                  
                  {/* Rutas protegidas */}
                  {auth.isLoggedIn ? (
                    <>
                      <Route path="/Home" element={<Home />} />
                      <Route path="/Search" element={<Busqueda />} />
                      <Route path="/Shop" element={<Tienda />} />
                      <Route path="/Profile" element={<Perfil />} />
                      <Route path="/Options" element={<Opciones />} />
                      <Route path="/Logout" element={<Logout />} />
                      <Route path="/Classes" element={<Classes />} />
                      <Route path="/scan-qr" element={<QRCodeScanner />} />
                      <Route path="*" element={<Navigate to="/Home" />} />
                    </>
                  ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                  )}
                </Routes>
                {auth.isLoggedIn && (
                  <>
                    <div id='paddedBozo' className='fill'></div>
                  </>
                )}
              </div>
            )}
          </AuthContext.Consumer>
        </CurrencyContext.Provider>
      </Router>
    </AuthProvider>
  );
}

export default App;


//Supabase pass: PANbGhjFW2bj91qi



/* 
____▒▒▒▒▒
—-▒▒▒▒▒▒▒▒▒
—–▓▓▓░░▓░
—▓░▓░░░▓░░░
—▓░▓▓░░░▓░░░
—▓▓░░░░▓▓▓▓
——░░░░░░░░
—-▓▓▒▓▓▓▒▓▓
–▓▓▓▒▓▓▓▒▓▓▓
▓▓▓▓▒▒▒▒▒▓▓▓▓
░░▓▒░▒▒▒░▒▓░░
░░░▒▒▒▒▒▒▒░░░
░░▒▒▒▒▒▒▒▒▒░░
—-▒▒▒ ——▒▒▒
–▓▓▓———-▓▓▓
▓▓▓▓———-▓▓▓▓
*/

//--- TPFinal
//Sprint 1: Buscar ✅
//Sprint 2: Home y Perfil ✅
//Sprint 3: Editar Perfil, Ver Clases Próximas y Opciónes ✅
//Sprint 4: Tienda y sistema de Usuarios (Login, Registro y Logout) ✅
//Sprint 5: Arreglar bugs (Temas, localStorage para el AuthContext y terminar Register con las fotos) - 4 Nov.

/* 
Change Log (Sprint 5):

21/10:
- ErrorHandlers agregados donde no estaban
- Ahora el AuthContext se guarda dentro de localStorage
- Landing, Login y Register ahora se fijan en el AuthContext y en el caso que haya un usuario redirigir a Home

28/10:
- Creación del bucket arbys (Se tendrá que migrar toda la estructura -~-) //No porque si dejamos que sea publico podemos agarrar y usar URLs todavía
- Ahora cuando te registras podés subir una foto al bucket de Supabase

*/

//--- DAI
//Func 1: Configuración de Nro. Emergencia - Expo ✅
//Func 2: Mensajes al usuario - TPFinal ✅
//Func 3: Llamado de Emergencia - Expo ✅
//Func 7: Identificación de cada Aplicación - TPFinal ✅ - No lee QRs y no c por qué :|