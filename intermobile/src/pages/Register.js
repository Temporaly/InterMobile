import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../components/AuthContext';
import { supabase } from '../utils/supabase';
import ErrorHandler from '../components/ErrorHandler';

export default function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleError = (message) => {
        setError(message);
    };
    
    const handleCloseError = () => {
        setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const { data: billeteraData, error: billeteraError } = await supabase
            .from('Billetera')
            .insert([{ Saldo: 0 }])
            .select();

        if (billeteraError) {
            console.error('Error al crear billetera:', billeteraError);
            handleError('Error en el Registro: ' + billeteraError.message);
            //navigate('/'); 
            return;
        }

        const idBilletera = billeteraData[0].id;

        const { error: usuarioError } = await supabase
            .from('Usuario')
            .insert([{
                Username: username,
                Contraseña: password,
                Nombre: nombre,
                Apellido: " ",
                Contacto: email,
                IDBilletera: idBilletera,
                Foto: 'https://campus.ort.edu.ar/static/archivos/usuarioperfil/87149',
            }]);

        if (usuarioError) {
            console.error('Error al crear usuario:', usuarioError.message);
            handleError('Error en el Registro: ' + usuarioError.message);
            //navigate('/'); 
            return;
        }

        const { data: usuarioData, error: consultaError } = await supabase
            .from('Usuario')
            .select('IDUsuario')
            .eq('Username', username)
            .single();

        if (consultaError) {
            console.error('Error al obtener el ID del usuario:', consultaError.message);
            handleError('Error en el Registro: ' + consultaError.message);
            //navigate('/'); 
            return;
        }

        const idUsuario = usuarioData.IDUsuario;
        const { error: updateError } = await supabase
            .from('Usuario')
            .update({ IDBilletera: idUsuario })
            .eq('IDUsuario', idUsuario);

        if (updateError) {
            console.error('Error al actualizar IDBilletera:', updateError.message);
            handleError('Error en el Registro: ' + updateError.message);
            //navigate('/'); 
            return;
        }

        // Actualiza el contexto de autenticación y redirige a Home
        console.log(idUsuario)
        login(username, password, idUsuario); // Actualiza con el IDUsuario
        navigate('/Home');
    };

    useEffect(() => {

        if(auth.isLoggedIn)
        {
            navigate('/Home');
        }

    })

    return (
        <div className="App-FT" style={{ height: "100vh", display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <ErrorHandler message={error} onClose={handleCloseError} />
            <h1 className="App-FT_Welc" style={{ margin: "20%" }}>Registro</h1>
            <div className='fill'></div>
            <Form style={{ width: '300px', margin: '20px' }} onSubmit={handleRegister}>
                <Form.Group controlId="formBasic">
                    <Form.Label style={{ color: "#3A95B5" }}>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre de usuario"
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

                <Form.Group controlId="formBasic2" style={{ marginTop: "5%" }}>
                    <Form.Label style={{ color: "#3A95B5" }}>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su Nombre"
                        style={{ backgroundColor: "#095DB7", border: "#095DB7" }}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" style={{ paddingTop: "5%" }}>
                    <Form.Label style={{ color: "#3A95B5" }}>E-Mail</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese su correo"
                        style={{ backgroundColor: "#095DB7", border: "#095DB7" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
}