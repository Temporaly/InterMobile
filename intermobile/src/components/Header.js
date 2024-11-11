import React, { useState, useEffect, useContext } from 'react';
import Stack from 'react-bootstrap/Stack';
import logo from '../vendor/logo.svg';
import { supabase } from '../utils/supabase';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import { AuthContext } from '../components/AuthContext'; // Importar AuthContext
import { useTheme } from '../utils/ThemeContext.js';

function Header() {
    const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
    const [userData, setUserData] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        async function fetchUserData() {
            if (!auth.isLoggedIn || !auth.IDUsuario) {
                return; // No hacer nada si no hay usuario autenticado
            }

            const { data, error } = await supabase
                .from('Usuario')
                .select('*')
                .eq('IDUsuario', auth.IDUsuario) // Usar IDUsuario del contexto
                .single();

            if (error) {
                console.error('Error fetching user data:', error);
            } else {
                setUserData(data);
            }
        }

        fetchUserData();
    }, [auth]); // Agregar auth como dependencia

    useEffect(() => {
        // Buscar el elemento y cambiar su estilo de fondo cuando cambie el tema
        const dropdownButton = document.getElementById('dropdown-basic-button');
        if (dropdownButton) {
            dropdownButton.style.backgroundColor = theme.mainColor; // Cambia el color de fondo
        }
    }, ); // Ejecuta el efecto cuando el tema cambie

    return (
        <Stack direction="horizontal" gap={3}>
            <div className="p-2"><img src={logo} alt="logo" className="logo_nav" /></div>
            {userData ? (
                <>
                    <div style={{ fontSize: '20', color: theme.text }} className="p-2 ms-auto fs-3s">{userData.Username}</div>
                    <div className="p-2">
                        <DropdownButton id="dropdown-basic-button" title={<img src={userData.Foto} alt="Pfp" className="pfp"/>}>
                            <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/options">Opciones</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/logout">Cerrar Sesión</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </>
            ) : (
                <div className="p-2 ms-auto fs-3s">Cargando...</div>
            )}
        </Stack>
    );
}

export default Header;