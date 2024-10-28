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
    const [file, setFile] = useState(null); // Nuevo estado para la imagen
    const [error, setError] = useState('');

    const handleError = (message) => {
        setError(message);
    };
    
    const handleCloseError = () => {
        setError('');
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        let imageUrl = '';
    
        // Subir la imagen a Supabase Storage si hay un archivo
        if (file) {
            // Renombrar el archivo con el nombre de usuario
            const fileExtension = file.name.split('.').pop(); // Obtiene la extensión del archivo
            const newFileName = `${username}.${fileExtension}`; // Renombra el archivo
            const filePath = `arbys/${newFileName}`; // Nuevo path del archivo
            // eslint-disable-next-line
            const { data, error: uploadError } = await supabase.storage.from('arbys').upload(filePath, file);

            if (uploadError) {
                console.error('Error subiendo la imagen:', uploadError);
                handleError('Error en el Registro: ' + uploadError.message);
                return;
            } else {
                console.log('Archivo subido exitosamente:', data);
            }
    
            // Obtener la URL pública de la imagen
            //let { publicURL } = await supabase.storage.from('arbys').getPublicUrl(filePath)
            imageUrl = await supabase.storage.from('arbys').getPublicUrl(filePath); // Asignar la URL pública
            console.log(imageUrl);
        }
    
        // Crear billetera
        const { data: billeteraData, error: billeteraError } = await supabase
            .from('Billetera')
            .insert([{ Saldo: 0 }])
            .select();
    
        if (billeteraError) {
            console.error('Error al crear billetera:', billeteraError);
            handleError('Error en el Registro: ' + billeteraError.message);
            return;
        }
    
        const idBilletera = billeteraData[0].id;
    
        // Insertar el usuario en la base de datos
        const { error: usuarioError } = await supabase
            .from('Usuario')
            .insert([{
                Username: username,
                Contraseña: password,
                Nombre: nombre,
                Apellido: " ",
                Contacto: email,
                IDBilletera: idBilletera,
                Foto: imageUrl.data.publicUrl || '', // Usar la URL de la imagen si existe
            }]);
    
        if (usuarioError) {
            console.error('Error al crear usuario:', usuarioError.message);
            handleError('Error en el Registro: ' + usuarioError.message);
            return;
        }
    
        // Consultar el ID del usuario
        const { data: usuarioData, error: consultaError } = await supabase
            .from('Usuario')
            .select('IDUsuario')
            .eq('Username', username)
            .single();
    
        if (consultaError) {
            console.error('Error al obtener el ID del usuario:', consultaError.message);
            handleError('Error en el Registro: ' + consultaError.message);
            return;
        }
    
        const idUsuario = usuarioData.IDUsuario;
    
        // Actualizar IDBilletera
        const { error: updateError } = await supabase
            .from('Usuario')
            .update({ IDBilletera: idUsuario })
            .eq('IDUsuario', idUsuario);
    
        if (updateError) {
            console.error('Error al actualizar IDBilletera:', updateError.message);
            handleError('Error en el Registro: ' + updateError.message);
            return;
        }
    
        // Actualiza el contexto de autenticación y redirige a Home
        login(username, password, idUsuario);
        navigate('/Home');
    };
    
    

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate('/Home');
        }
    }, [auth.isLoggedIn, navigate]);

    return (
        <div className="App-FT" style={{ height: "100vh", display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <ErrorHandler message={error} onClose={handleCloseError} />
            <h1 className="App-FT_Welc" style={{ marginTop: "20%" }}>Registro</h1>
            <Form style={{ width: '300px', margin: '20px' }} onSubmit={handleRegister}>

            <div className="upload-circle" style={{ display: 'flex', justifyContent: 'center', margin: '10%' }}>
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: '#007bff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        <span style={{ color: 'white', fontSize: '24px' }}>📷</span>
                    </div>
                </div>
                
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
