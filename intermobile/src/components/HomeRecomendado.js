import React, { useState, useEffect } from 'react';
import UserCard from './Card'; // Asegúrate de que la ruta sea correcta
import { supabase } from '../utils/supabase';
import ErrorHandler from './ErrorHandler';
import { useTheme } from '../utils/ThemeContext.js';

const HomeRec = () => {
  const [user, setUser] = useState(null);
  const [listMaterias, setMaterias] = useState(null);
  const [materiasXPerson, setMateriasXPerson] = useState(null);
  const { theme } = useTheme();

  const [error, setError] = useState('');

  const handleError = (message) => {
    setError(message);
  };

  const handleCloseError = () => {
    setError('');
  };

  useEffect(() => {
    // Función para obtener un usuario aleatorio
    const fetchRandomUser = async () => {
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .gte('IDUsuario', 3)
        .lte('IDUsuario', 7);

      if (error) {
        console.error('Error fetching user:', error);
        handleError("Error al traer los datos del Usuario\n " + error.message);
      } else if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setUser(data[randomIndex]);
      }
    };

    const fetchMaterias = async () => {
      const { data, error } = await supabase
        .from('Materia')
        .select('*');

      if (error) {
        console.error('Error fetching materias:', error);
        handleError("Error al traer las Materias\n " + error.message);
      } else if (data && data.length > 0) {
        setMaterias(data);
      }
    };

    const fetchMateriasXPersona = async () => {
      const { data, error } = await supabase
        .from('MateriaQueDa')
        .select('*');

      if (error) {
        console.error('Error fetching materias de personas:', error);
        handleError("Error al traer las Materias\n " + error.message);
      } else if (data && data.length > 0) {
        setMateriasXPerson(data);
      }
    };

    fetchRandomUser();
    fetchMaterias();
    fetchMateriasXPersona();
  }, []); // Este efecto solo se ejecuta una vez, al montar el componente

  // Solo renderiza UserCard si los datos están disponibles
  return (
    <div>
      <h2 className='rec' style={{color: theme.text}}>Alumno Del Día</h2>
      <div className="UsCard">
        {user && listMaterias && materiasXPerson ? (
          <UserCard 
            user={user} 
            materias={listMaterias} 
            materiaxpersona={materiasXPerson} 
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ErrorHandler message={error} onClose={handleCloseError} />
    </div>
  );
};

export default HomeRec;
