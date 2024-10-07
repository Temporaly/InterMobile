import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function Register(){
    return (
        <div className="App-FT" style={{height: "100vh", display: 'flex', flexDirection: "column", alignItems: "center"}}>
            <h1 className="App-FT_Welc" style={{margin: "20%"}}>Registro</h1>
            <div className='fill'></div>
            <Form style={{ width: '300px', margin: '20px' }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{color: "#3A95B5"}}>E-Mail</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo" style={{backgroundColor: "#095DB7", border: "#095DB7"}} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{paddingTop: "5%"}}>
                    <Form.Label style={{color: "#3A95B5"}}>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" style={{backgroundColor: "#095DB7", border: "#095DB7"}} />
                </Form.Group>

                <Form.Group controlId="formBasic" style={{marginTop: "5%"}}>
                    <Form.Label style={{color: "#3A95B5"}}>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su Nombre" style={{backgroundColor: "#095DB7", border: "#095DB7"}} />
                </Form.Group>

                <Form.Group controlId="formBasic2" style={{paddingTop: "5%"}}>
                    <Form.Label style={{color: "#3A95B5"}}>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su Apellido" style={{backgroundColor: "#095DB7", border: "#095DB7"}} />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: '100%', background: "#095DB7", color: "#083E78", marginTop: "20%" }}>
                    Registrarse
                </Button>
            </Form>
            <div style={{ margin: '20px' }}>
                <Link to="/Login" style={{ color: "#095DB7" }}>
                    ¿Ya tienes cuenta? Ingresa aquí
                </Link>
            </div>
        </div>
    );
};