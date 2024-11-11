import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import { useTheme } from '../utils/ThemeContext.js';

const UserCard = ({ user, materias, materiaxpersona }) => {

  const { theme } = useTheme();

  // Función para obtener los nombres de las materias que el usuario enseña
  const getMateriasProfesor = () => {
    console.log("A ver si existe")
    console.log("Materias: " + materias[1].Nombre + " Materia Persona: " + materiaxpersona[1].IDMateria + " Usuario: " + user.Username)
    if (!materias[1].Nombre || !materiaxpersona[1].IDMateria || !user.Username) return '';
    console.log("Empecé a filtrar")
    // Filtrar las materias que el usuario enseña
    const materiasDelUsuario = materiaxpersona
      .filter(materiaxpersona => materiaxpersona.IDUsuario === user.IDUsuario)
      .map(materiaxpersona => materiaxpersona.IDMateria);

    // Obtener nombres únicos de las materias
    const nombresMaterias = [...new Set(materiasDelUsuario.map(idMateria => {
      const materia = materias.find(m => m.IDMateria === idMateria);
      return materia ? materia.Nombre : null;
    }))];

    // Unir los nombres de las materias con coma
    return nombresMaterias.join(', ');
  };

  const materiasProfesor = getMateriasProfesor();
  console.log("Materias Profe: " + materiasProfesor)

  return (
    <Card style={{ backgroundColor: theme.lighterMain, marginBottom: '5%' }}>
      <Card.Body>
        <Card.Title>{user.Nombre + " " + user.Apellido}</Card.Title>
        <Card.Img class="Cardpfp" src={user.Foto} />
        <Card.Text className='paddedBott'>
          {materiasProfesor ? `Profesor de ${materiasProfesor}` : 'Alumno'}
        </Card.Text>
        <Button variant="primary" style={{color: theme.lighterMain, background: theme.mainColor}}>Contactar</Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;


/*import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';

const UserCard = ({ user, materias, materiaxpersona }) => {
  // Función para obtener los nombres de las materias que el usuario enseña
  const getMateriasProfesor = () => {
    console.log("A ver si existe")
    if (!materias[1].Nombre || !materiaxpersona[1].IDMateria || !user.Username) return '';
    console.log("Empecé a filtrar")
    // Filtrar las materias que el usuario enseña
    const materiasDelUsuario = materiaxpersona
      .filter(materiaxpersona => materiaxpersona.IDUsuario === user.IDUsuario)
      .map(materiaxpersona => materiaxpersona.IDMateria);

    // Obtener nombres únicos de las materias
    const nombresMaterias = [...new Set(materiasDelUsuario.map(idMateria => {
      const materia = materias.find(m => m.IDMateria === idMateria);
      return materia ? materia.Nombre : null;
    }))];

    // Unir los nombres de las materias con coma
    return nombresMaterias.join(', ');
  };

  const materiasProfesor = getMateriasProfesor();
  console.log("Materias Profe: " + materiasProfesor)

  return (
    <Card style={{ backgroundColor: '#3A95B5', marginBottom: '5%' }}>
      <Card.Body>
        <Card.Title>{user.Username}</Card.Title>
        <Card.Img className="Cardpfp" src={user.Foto} />
        <Card.Text className='paddedBott'>
          {materiasProfesor ? `Profesor de ${materiasProfesor}` : 'Profesor de materias desconocidas'}
        </Card.Text>
        <Button variant="primary">Contactar</Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;*/
