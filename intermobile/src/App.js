import './App.css';
import Header from './components/Header.js'
//import UserCard from './components/Card.js'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.css';
import './App.css'
// import SearchBar from './components/SearchBar.js';
import BottomNavbar from './components/BottomNavbar.js';
import HomeRec from './components/HomeRecomendado.js';
import SearchBar from './components/SearcherSupa.js';

function App() {
  return (
    <div className="App">
      <header class="bg">
        <Header/>
      </header>

      <div id='queryGens'>
        <SearchBar/>
      </div>

      <div id='HomeRec'>
        <HomeRec/>
      <div id='Filler' className='fill'></div>
      </div>
      <BottomNavbar />
    </div>
  );
}
//Supabase pass: PANbGhjFW2bj91qi
export default App;
