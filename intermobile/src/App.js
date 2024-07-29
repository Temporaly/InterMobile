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

function App() {
  return (
    <Router>
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
        </Routes>
        <div id='Filler' className='fill'></div>
        <BottomNavbar />
      </div>
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