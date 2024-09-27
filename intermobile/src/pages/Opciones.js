import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../App'; // Import CurrencyContext

const Opciones = () => {
  const navigate = useNavigate();
  const { changeTheme } = " "; // Access the theme change function
  const { setCurrency } = useContext(CurrencyContext); // Access the currency setter

  const [formState, setFormState] = useState({
    theme: '',
    currency: '',
    emailNotifications: false,
  });

  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const camera = devices.find(device => device.kind === 'videoinput');
        setHasCamera(!!camera);
      } catch (error) {
        console.error('Error checking camera availability:', error);
      }
    };

    checkCameraAvailability();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Configuración guardada:', formState);

    if (formState.theme) {
      changeTheme(formState.theme);
    }

    if (formState.currency) {
      setCurrency(formState.currency); // Change currency globally
    }

    navigate(-1); // Go back after submitting
  };

  const handleScanQR = () => {
    // Navigate to your QR code scanning page
    navigate('/scan-qr');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 style={{ paddingTop: "4%" }}>Opciones</h2>
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
                <option value="light">Por Defecto</option>
                <option value="dark">Oscuro</option>
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
                <option value="Intercoins">Intercoins</option>
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" style={{ color: "#FFFFFF", marginTop: "15%" }}>
              Guardar Cambios
            </Button>
          </Form>

          {/* Show the About button only if the device has a camera */}
          {hasCamera && (
              <Button 
                variant="secondary" 
                onClick={handleScanQR} 
                style={{ marginTop: "15%" }}
              >
                About
              </Button>
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default Opciones;
