/*import React from "react";

export default function Login(){

    return(
        <div>
            Ingresar Credenciales
        </div>
    )

}*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import logoLand from "../vendor/logo-land.svg";

function Login(){
    return (
        <div className="App-FT" style={{height: "100vh", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div className='fill'></div>
            <h1 className="App-FT_Welc">Iniciar Sesión</h1>
            <img src={logoLand} alt="logo" className="App-FT_logo" />
            <Form style={{ width: '300px', margin: '20px' }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{color: "#3A95B5"}}>E-Mail</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo" style={{backgroundColor: "#095DB7", border: "#095DB7"}} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{paddingTop: "5%"}}>
                    <Form.Label style={{color: "#3A95B5"}}>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" style={{backgroundColor: "#095DB7", border: "#095DB7"}} />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: '100%', background: "#095DB7", color: "#083E78", marginTop: "22%" }}>
                    Iniciar Sesión
                </Button>
            </Form>
            <div style={{ margin: '20px' }}>
                <Link to="/Register" style={{ color: "#095DB7" }}>
                    ¿No tienes una cuenta? Regístrate aquí
                </Link>
            </div>
        </div>
    );
};

export default Login;
