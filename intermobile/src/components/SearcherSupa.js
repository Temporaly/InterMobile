import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import UserCard from './Card'; // Asegúrate de que la ruta sea correcta
import ErrorHandler from './ErrorHandler';
import { useTheme } from '../utils/ThemeContext.js';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [listMaterias, setMaterias] = useState([]);
  const [materiasXPerson, setMateriasXPerson] = useState([]);
  const { theme } = useTheme();

  const [error, setError] = useState('');

  const handleError = (message) => {
    setError(message);
  };

  const handleCloseError = () => {
    setError('');
  };

  // Función para obtener todas las materias y materias por persona
  useEffect(() => {
    const fetchMaterias = async () => {
      const { data, error } = await supabase
        .from('Materia')
        .select('*');

      if (error) {
        console.error('Error fetching materias:', error);
        handleError("Error al traer las Materias\n " + error.message);
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
        handleError("Error al traer las Materias\n " + error.message);
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
      handleError("Error al traer los datos\n " + error.message);
    } else {
      setResults(data || []);
    }
  };

  return (
    <div className='search'>
      <Form onSubmit={handleSearch}>
        <InputGroup  className="mb-3 align-items-center">
          <FormControl
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ borderRadius: '20px', backgroundColor: theme.mainColor, paddingTop: '4%', paddingBottom: '4%', border: "0" }}
          />
          {/* <InputGroup>
            <Button type="submit" variant="primary" style={{ borderRadius: '20px' }}>Buscar</Button>
          </InputGroup> */}
        </InputGroup>
      </Form>
      {results.length > 0 && (
        <div>
          <h2 className='HomeRec' style={{color: theme.text}}>Resultados de la búsqueda:</h2>
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
      <ErrorHandler message={error} onClose={handleCloseError} />
    </div>
  );
};

export default SearchBar;
