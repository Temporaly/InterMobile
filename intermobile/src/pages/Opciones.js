/*

function Opciones()
{
    return(
        <div>
            <h1>Hola, Opciones funciona!</h1>
        </div>
    );
}

export default Opciones*/

// src/components/Settings.js
// src/components/Opciones.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Opciones = () => {
const navigate = useNavigate();
  const [formState, setFormState] = useState({
    theme: '',
    currency: '',
    emailNotifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar la lógica para guardar la configuración
    console.log('Configuración guardada:', formState);
    navigate(-1);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 style={{ paddingTop: "4%"}}>Opciones</h2>
          <Form onSubmit={handleSubmit}>
          <h5>Visuales</h5>
            <Form.Group controlId="formTheme" className='paddedBott'>
              <Form.Label>Tema</Form.Label>
              <Form.Control
                as="select"
                name="theme"
                value={formState.theme}
                onChange={handleChange}
              >
                <option value="">Selecciona un tema</option>
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
                <option value="blue">Azul</option>
              </Form.Control>
            </Form.Group>

            <h5>Monetarias</h5>

            <Form.Group controlId="formCurrency" className='paddedBott'>
              <Form.Label>Mostrar Precio en</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={formState.currency}
                onChange={handleChange}
              >
                <option value="">Selecciona una moneda</option>
                <option value="intercoins">Intercoins</option>
                <option value="ars">ARS</option>
                <option value="usd">USD</option>
              </Form.Control>
            </Form.Group>

            <h5>Misceláneas</h5>

            <Form.Group controlId="formEmailNotifications" className='paddedBott'>
              <Form.Check
                type="checkbox"
                name="emailNotifications"
                label="Recibir notificaciones por correo electrónico"
                checked={formState.emailNotifications}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{color: "#FFFFFF", marginTop: "15%"}}>
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Opciones;
