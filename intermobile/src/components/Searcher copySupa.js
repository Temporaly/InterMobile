import React, { useState } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { supabase } from '../utils/supabase'

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Usuario')  // Reemplaza con el nombre de tu tabla
      .select('*')
      .ilike('your-column-name', `%${query}%`);  // Reemplaza con el nombre de la columna que deseas buscar

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setResults(data);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ borderRadius: '20px' }}
          />
          <InputGroup.Append>
            <Button type="submit" variant="primary" style={{ borderRadius: '20px' }}>Buscar</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.your_column_name}</li> // Reemplaza con la columna que deseas mostrar
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;