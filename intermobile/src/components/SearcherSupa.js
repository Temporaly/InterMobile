import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import UserCard from './Card.js'; // Importa el componente UserCard

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Fetching results for:', query); // Para rastrear cuándo se llama
    const { data, error } = await supabase
      .from('Usuario')  // Reemplaza con el nombre de tu tabla
      .select('*')
      .ilike('Username', `%${query}%`)  // Reemplaza con el nombre de la columna que deseas buscar
      .neq('IDUsuario', 2);  // Excluye resultados donde IDUsuario sea 2

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setResults(data);
    }
  };

  return (
    <div className='search'>
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3 align-items-center">
          <FormControl
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ borderRadius: '20px', backgroundColor: '#3A95B5', paddingTop: '4%', paddingBottom: '4%' }}
          />
          {/* <InputGroup>
            <Button type="submit" variant="primary" style={{ borderRadius: '20px' }}>Buscar</Button>
          </InputGroup> */}
        </InputGroup>
      </Form>
      {results.length > 0 && (
        <div>
          <h2 className='HomeRec'>Resultados de la búsqueda:</h2>
          {results.map((result) => (
            <UserCard key={result.id} user={result} /> // Utiliza UserCard para mostrar los resultados
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
