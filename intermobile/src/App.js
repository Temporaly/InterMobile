import './App.css';
import Header from './components/Header.js'
import UserCard from './components/Card.js'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.css';
import './App.css'
import SearchBar from './components/SearchBar.js';
import BottomNavbar from './components/BottomNavbar.js';
import JoseCard from './nosupabase/Jose.js';
import CasimCard from './nosupabase/Casimiro.js';
import JesusCard from './nosupabase/Jesus.js';
import JuanCard from './nosupabase/Juan.js';
import JuanMarCard from './nosupabase/JuanMaria.js';

function App() {
  return (
    <div className="App">
      <header class="bg">
        <Header/>
      </header>
      <div>
        <SearchBar/>
      </div>
      <div>
        <h2 className='rec'>Alumnos Recomendados</h2>
        <div class="UsCard">
          <JoseCard/>
          <CasimCard/>
          <JesusCard/>
          <JuanCard/>
          <JuanMarCard/>
        {/* <UserCard/> */}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}
//Supabase pass: PANbGhjFW2bj91qi
export default App;
