// src/components/Opciones.js
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';

const DummyThemeTest = () => {
  const { theme, setTheme, currentTheme } = useTheme();
  const [currency, setCurrency] = React.useState('');
  const [emailNotifications, setEmailNotifications] = React.useState(false);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleNotificationsChange = (e) => {
    setEmailNotifications(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Configuración guardada:', { theme, currency, emailNotifications });
  };

  return (
    <Container style={{ backgroundColor: currentTheme.background, color: currentTheme.color, minHeight: '100vh', padding: '2rem' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Opciones</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTheme">
              <Form.Label>Tema</Form.Label>
              <Form.Control
                as="select"
                value={theme}
                onChange={handleThemeChange}
              >
                <option value="default">Claro</option>
                <option value="altdefault">Oscuro</option>
                <option value="monolight">Azul</option>
                <option value="monodark">Azul</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCurrency">
              <Form.Label>Mostrar Precio en</Form.Label>
              <Form.Control
                as="select"
                value={currency}
                onChange={handleCurrencyChange}
              >
                <option value="intercoins">Intercoins</option>
                <option value="ars">ARS</option>
                <option value="usd">USD</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEmailNotifications">
              <Form.Check
                type="checkbox"
                label="Recibir notificaciones por correo electrónico"
                checked={emailNotifications}
                onChange={handleNotificationsChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DummyThemeTest;