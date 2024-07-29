import HomeRec from '../components/HomeRecomendado.js';
import SearchBar from '../components/SearcherSupa.js';

function Busqueda()
{
    return(
        <div name= "Página - Búsqueda">
        <div id='queryGens'>
            <SearchBar/>
        </div>
        <div id='HomeRec'>
            <HomeRec/>
        </div>
        </div>
    );
}

export default Busqueda