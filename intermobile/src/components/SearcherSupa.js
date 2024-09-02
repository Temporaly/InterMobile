import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import UserCard from './Card'; // Asegúrate de que la ruta sea correcta

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [listMaterias, setMaterias] = useState([]);
  const [materiasXPerson, setMateriasXPerson] = useState([]);

  // Función para obtener todas las materias y materias por persona
  useEffect(() => {
    const fetchMaterias = async () => {
      const { data, error } = await supabase
        .from('Materia')
        .select('*');

      if (error) {
        console.error('Error fetching materias:', error);
      } else {
        setMaterias(data || []);
      }
    };

    const fetchMateriasXPersona = async () => {
      const { data, error } = await supabase
        .from('MateriaQueDa')
        .select('*');

      if (error) {
        console.error('Error fetching materias de personas:', error);
      } else {
        setMateriasXPerson(data || []);
      }
    };

    fetchMaterias();
    fetchMateriasXPersona();
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Fetching results for:', query); // Para rastrear cuándo se llama

    const { data, error } = await supabase
      .from('Usuario')  // Reemplaza con el nombre de tu tabla
      .select('*')
      .or(`Username.ilike.%${query}%,Nombre.ilike.%${query}%,Apellido.ilike.%${query}%`)  // Buscar en múltiples columnas
      .neq('IDUsuario', 2);  // Excluye resultados donde IDUsuario sea 2

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setResults(data || []);
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
            <UserCard 
              key={result.IDUsuario} // Asegúrate de tener una clave única para cada elemento
              user={result} 
              materias={listMaterias} 
              materiaxpersona={materiasXPerson} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
