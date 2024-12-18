import React, { useEffect, useState, useContext } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import { FaCalendarAlt } from 'react-icons/fa';
import CustomCalendar from '../components/Calendar';
import ErrorHandler from '../components/ErrorHandler';
import { AuthContext } from '../components/AuthContext';
import { useTheme } from '../utils/ThemeContext.js';

const CalendarPage = () => {
  const { auth } = useContext(AuthContext);
  //const [clases, setClases] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [events, setEvents] = useState([]); // Array para almacenar eventos
  const [clasesPasadas, setClasesPasadas] = useState([]);
  const [clasesFuturas, setClasesFuturas] = useState([]);
  const { theme } = useTheme();

  const [error, setError] = useState('');

  const handleError = (message) => {
    setError(message);
  };

  const handleCloseError = () => {
    setError('');
  };

  useEffect(() => {
    const fetchData = async () => {
      // Obtener todas las materias
      let { data: materiasData, error: materiasError } = await supabase
        .from('Materia')
        .select('*');

      if (materiasError) {
        console.error(materiasError);
        handleError("Error al traer las Materias\n " + materiasError.message);
      } else {
        setMaterias(materiasData);

        // Obtener las clases con IDUsuarioReceptor = 2
        let { data: clasesData, error: clasesError } = await supabase
          .from('Clase')
          .select('*')
          .eq('IDUsuarioReceptor', auth.IDUsuario);

        if (clasesError) {
          console.error(clasesError);
          handleError("Error al traer las Clases del Usuario\n " + clasesError.message);
        } else {
          // Separar las clases en futuras y pasadas
          const ahora = new Date();
          const futuras = [];
          const pasadas = [];

          clasesData.forEach((clase) => {
            const fechaClase = new Date(clase.Fecha);
            if (fechaClase >= ahora) {
              futuras.push(clase);
            } else {
              pasadas.push(clase);
            }
          });

          // Crear un array de eventos basado en las fechas de las clases
          const eventos = futuras.map((clase) => ({
            title: getMateriaNombre(clase.IDMateria, materiasData),
            date: new Date(clase.Fecha),
          }));
          setEvents(eventos); // Actualizar el estado de los eventos

          setClasesFuturas(futuras);
          setClasesPasadas(pasadas);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez

  // Función para obtener el nombre de la materia a partir de su ID
  const getMateriaNombre = (idMateria, materiasData) => {
    const materia = materiasData.find((materia) => materia.IDMateria === idMateria);
    return materia ? materia.Nombre : 'Materia desconocida';
  };

  return (
    <Container className="my-5">
      <h1 className="text-center" style={{ paddingBottom: "5%", color: theme.text }}>
        <FaCalendarAlt /> Calendario de Clases
      </h1>
      <Row className="justify-content-center">
        <Col md={12}>
          {/* Pasar el array de eventos al componente CustomCalendar */}
          <CustomCalendar events={events} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <h1 className="text-center" style={{ paddingBottom: "5%", color: theme.text }}>Clases Agendadas</h1>
        {clasesFuturas.length > 0 ? (
          clasesFuturas.map((clase) => (
            <Col key={clase.ID} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{getMateriaNombre(clase.IDMateria, materias)}</Card.Title>
                  <Card.Text>
                    Fecha: {new Date(clase.Fecha).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12} className="text-center">
            <p style={{ color: theme.text}}>No tienes ninguna clase próxima</p>
          </Col>
        )}
        {clasesPasadas.length > 0 && (
          <>
            <h2 className="text-center" style={{ paddingBottom: "5%", color: theme.warnColor }}>Clases Pasadas</h2>
            {clasesPasadas.map((clase) => (
              <Col key={clase.ID} md={4} className="mb-4">
                <Card style={{ backgroundColor: "#f8d7da" }}> {/* Color rojo claro para las tarjetas */}
                  <Card.Body>
                    <Card.Title>{getMateriaNombre(clase.IDMateria, materias)}</Card.Title>
                    <Card.Text>
                      Fecha: {new Date(clase.Fecha).toLocaleDateString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
      <ErrorHandler message={error} onClose={handleCloseError} />
    </Container>
  );
};

export default CalendarPage;
