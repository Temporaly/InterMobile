import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import { FaCalendarAlt } from 'react-icons/fa';
import CustomCalendar from '../components/Calendar';

const CalendarPage = () => {
  const [clases, setClases] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [events, setEvents] = useState([]); // Array para almacenar eventos

  useEffect(() => {
    const fetchData = async () => {
      // Obtener todas las materias
      let { data: materiasData, error: materiasError } = await supabase
        .from('Materia')
        .select('*');

      if (materiasError) {
        console.error(materiasError);
      } else {
        setMaterias(materiasData);

        // Obtener las clases con IDUsuarioReceptor = 2
        let { data: clasesData, error: clasesError } = await supabase
          .from('Clase')
          .select('*')
          .eq('IDUsuarioReceptor', 2);

        if (clasesError) {
          console.error(clasesError);
        } else {
          setClases(clasesData);

          // Crear un array de eventos basado en las fechas de las clases
          const eventos = clasesData.map((clase) => ({
            title: getMateriaNombre(clase.IDMateria, materiasData),
            date: new Date(clase.Fecha),
          }));
          setEvents(eventos); // Actualizar el estado de los eventos
        }
      }
    };

    fetchData();
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez

  // Función para obtener el nombre de la materia a partir de su ID
  const getMateriaNombre = (idMateria, materiasData) => {
    const materia = materiasData.find((materia) => materia.IDMateria === idMateria);
    return materia ? materia.Nombre : 'Materia desconocida';
  };

  return (
    <Container className="my-5">
      <h1 className="text-center" style={{ paddingBottom: "5%" }}>
        <FaCalendarAlt /> Calendario de Clases
      </h1>
      <Row className="justify-content-center">
        <Col md={12}>
          {/* Pasar el array de eventos al componente CustomCalendar */}
          <CustomCalendar events={events} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <h1 className="text-center" style={{ paddingBottom: "5%" }}>Clases Agendadas</h1>
        {clases.map((clase) => (
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
        ))}
      </Row>
    </Container>
  );
};

export default CalendarPage;
