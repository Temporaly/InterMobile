import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import logoLand from "../vendor/logo-land.svg";
import { AuthContext } from '../components/AuthContext';
import { supabase } from '../utils/supabase';
import ErrorHandler from '../components/ErrorHandler';

function Login() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const handleError = (message) => {
        setError(message);
    };
    
    const handleCloseError = () => {
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('Usuario')
            .select('*')
            .eq('Username', username)
            .eq('Contraseña', password)
            .single();

        if (error) {
            console.error('Error al iniciar sesión:', error.message);
            handleError('Error al Iniciar Sesión: ' + error.message);
            return; // Manejar el error
        }

        if (data) {
            const idUsuario = data.IDUsuario; // Obtener IDUsuario
            console.log(data.IDUsuario)
            login(username, password, idUsuario); // Actualiza el AuthContext con IDUsuario
            navigate('/Home');
        }
    };

    useEffect(() => {

        if(auth.isLoggedIn)
        {
            navigate('/Home');
        }

    })

    return (
        <div className="App-FT" style={{ height: "100vh", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ErrorHandler message={error} onClose={handleCloseError} />
            <div className='fill'></div>
            <h1 className="App-FT_Welc">Iniciar Sesión</h1>
            <img src={logoLand} alt="logo" className="App-FT_logo" />
            <Form style={{ width: '300px', margin: '20px' }} onSubmit={handleLogin}>
                <Form.Group controlId="formBasic">
                    <Form.Label style={{ color: "#3A95B5" }}>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ingrese su Nombre de Usuario" 
                        style={{ backgroundColor: "#095DB7", border: "#095DB7" }} 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{ paddingTop: "5%" }}>
                    <Form.Label style={{ color: "#3A95B5" }}>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Ingrese su contraseña" 
                        style={{ backgroundColor: "#095DB7", border: "#095DB7" }} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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