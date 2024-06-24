import './App.css';
import Header from './components/Header.js'
import UserCard from './components/Card.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className="App">
      <header class="bg">
        <Header/>
      </header>
      <div class="UsCard">
      <UserCard/>
      </div>
    </div>
  );
}
//Supabase pass: PANbGhjFW2bj91qi
export default App;
